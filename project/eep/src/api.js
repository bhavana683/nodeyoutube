import axios from 'axios'
const api=axios.create({
  baseURL:`${process.env.REACT_APP_API_URL}/api/auth`
})
export const googleAuth=(code)=>api.get(`/google?code=${code}`);

