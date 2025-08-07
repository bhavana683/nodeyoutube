import axios from 'axios'
const api=axios.create({
  baseURL:'http://localhost:7001/api/auth'
})
export const googleAuth=(code)=>api.get(`/google?code=${code}`);

