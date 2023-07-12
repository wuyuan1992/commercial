import { default as useSWR } from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function useRequest<T>(url: string) {
  return useSWR<T>(url, fetcher)
}
