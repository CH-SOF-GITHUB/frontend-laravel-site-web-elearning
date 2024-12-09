import React, { useState } from 'react';
import { Button } from './Button';
import '../css/Signup.css';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // State to track loading

    async function signup() {
        if (!name || !email || !password || !confirmpassword) {
            setError("Veuillez remplir tous les champs obligatoires.");
            return;
        }
        if (password !== confirmpassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        // Reset error and enable loading
        setError("");
        setLoading(true);

        let item = { name, email, password, password_confirmation: confirmpassword };

        try {
            let result = await fetch("http://localhost:8000/api/auth/register", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(item),
            });

            let response = await result.json();

            if (result.ok) {
                alert("Vous avez été enregistré avec succès !");
                window.location.replace("/login");
            } else {
                setError(response.password ? response.password[0] : "Vous avez été enregistré avec échec !");
            }
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            setError("Une erreur réseau est survenue. Veuillez réessayer plus tard.");
        } finally {
            setLoading(false); // Disable loading
        }
    }

    return (
        <>
            <div className="container">
                <h1>Lets Get Started</h1>
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
                <form className="form-control">
                    <div>
                        <label htmlFor="username">Name*</label>
                        <input
                            type="text"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                        />
                    </div>

                    <div>
                        <label htmlFor="email">Email*</label>
                        <input
                            type="text"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Password*</label>
                        <input
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmpassword">Password Confirmation*</label>
                        <input
                            type="password"
                            name="confirmpassword"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            id="confirmpassword"
                        />
                    </div>

                    <Button onClick={signup} className="btn" type="button" disabled={loading}>
                        {loading ? "Loading..." : "Register"}
                    </Button>
                </form>
            </div>
        </>
    );
}

export default Signup;