import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Success = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      const user = JSON.parse(localStorage.getItem("user-info"));
      if (!user || !user.access_token) {
        setPaymentStatus("User not authenticated.");
        return;
      }
        try {
            const response = await fetch(`http://localhost:8000/api/learning/verify-payment?session_id=${sessionId}`,{
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${user.access_token}`
                }
              }
            );
    
            const data = await response.json();
            if (data.status === "success") {
              setPaymentStatus("Payment successful, your enrollment is now validated!");
              setTimeout(() => navigate("/student/mycourses"), 5000); // Redirect after 5 seconds
            } else {
              setPaymentStatus("Payment failed. Please try again.");
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            setPaymentStatus("An error occurred while verifying the payment.");
          }
      }
      
    
    if (sessionId) {
      verifyPayment();
    }
  }, [sessionId, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Payment Status</h1>
      {paymentStatus ? (
        <p>{paymentStatus}</p>
      ) : (
        <p>Verifying payment, please wait...</p>
      )}
    </div>
  );
};
export default Success;
