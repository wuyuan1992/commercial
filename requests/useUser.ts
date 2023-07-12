import request from "@/utils/request"
import { useMutation } from "@tanstack/react-query"

import type { User } from "@/types/product"

function sendCode(email: string) {
  return request.post<void>(`/api/send-code`, { email })
}

function login(email: string, code: string) {
  return request.post<User>(`/api/login`, {
    email,
    code,
  })
}

function logout() {
  return request.post<void>(`/api/logout`)
}

export function useSendCode() {
  return useMutation({
    mutationKey: ["user", "sendCode"],
    mutationFn: sendCode,
  })
}

export function useLogin() {
  return useMutation({
    mutationKey: ["user", "login"],
    mutationFn: login,
  })
}

export function useLogout() {
  return useMutation({
    mutationKey: ["user", "logout"],
    mutationFn: logout,
  })
}
