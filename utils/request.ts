import { Toast } from "@douyinfe/semi-ui"
import Axios from "axios"

const request = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
})

request.interceptors.response.use(
  (res) => res.data,
  (err) => {
    Toast.error(err.response?.data?.message || err.message)
    if (err.response) {
      throw err.response.data
    }
    throw err
  }
)

export default request
