import { Toast } from "@douyinfe/semi-ui"
import Axios, { AxiosRequestConfig } from "axios"

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
})

axios.interceptors.response.use(
  (res) => res.data,
  (err) => {
    Toast.error(err.response?.data?.message || err.message)
    if (err.response) {
      throw err.response.data
    }
    throw err
  }
)

function request<T, D = any>(options: AxiosRequestConfig<D>) {
  return axios.request<T, T>(options)
}
function get<T, D = any>(url: string, options?: AxiosRequestConfig<D>) {
  return axios.get<T, T>(url, options)
}
function post<T, D = any>(
  url: string,
  data: D,
  options?: AxiosRequestConfig<D>
) {
  return axios.post<T, T>(url, data, options)
}
function put<T, D = any>(
  url: string,
  data: D,
  options?: AxiosRequestConfig<D>
) {
  return axios.put<T, T>(url, data, options)
}
function patch<T, D = any>(
  url: string,
  data: D,
  options?: AxiosRequestConfig<D>
) {
  return axios.patch<T, T>(url, data, options)
}
function remove<T, D = any>(url: string, options?: AxiosRequestConfig<D>) {
  return axios.delete<T, T>(url, options)
}
function head<T, D = any>(url: string, options?: AxiosRequestConfig<D>) {
  return axios.head<T, T>(url, options)
}
function options<T, D = any>(url: string, options?: AxiosRequestConfig<D>) {
  return axios.options<T, T>(url, options)
}

const requestUtils = {
  get,
  post,
  put,
  patch,
  delete: remove,
  request,
  head,
  options,
}

export default requestUtils
