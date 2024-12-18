import axios from 'axios'

const userInfo = JSON.parse(localStorage.getItem('user-info'))
const token = userInfo?.access_token

export default axios.create({
  baseURL: 'http://localhost:8000/api/learning/',
  headers: {
    Authorization: token ? `Bearer ${token}` : '', // Inclut le token si disponible
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});