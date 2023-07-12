"use client"

import { useEffect } from "react"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

export type ThemeMode = "light" | "dark"
export type ThemeColor = "blue" | "indigo" | "purple" | "teal" | "violet"

interface ThemeState {
  themeMode: ThemeMode
  themeColor: ThemeColor
}

interface ThemeActions {
  setThemeMode: (themeMode: ThemeMode) => void
  setThemeColor: (themeColor: ThemeColor) => void
}

export const useTheme = create<ThemeState & ThemeActions>()(
  devtools(
    persist(
      (set) => ({
        themeMode: "dark",
        themeColor: "indigo",
        setThemeMode: (themeMode: ThemeMode) =>
          set((state) => ({ ...state, themeMode })),
        setThemeColor: (themeColor: ThemeColor) =>
          set((state) => ({ ...state, themeColor })),
      }),
      { name: "theme" }
    )
  )
)

export function useWatchTheme() {
  const { themeColor, themeMode } = useTheme()

  useEffect(() => {
    // for semi
    document.body.setAttribute("theme-mode", themeMode)
    document.body.setAttribute("theme-color", themeColor)

    // for tailwind
    document.documentElement.setAttribute("theme-mode", themeMode)
    document.documentElement.setAttribute("theme-color", themeColor)
  }, [themeColor, themeMode])
}
