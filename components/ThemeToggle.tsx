"use client"

import * as React from "react"
import { useMemo } from "react"
import { ThemeColor, useTheme } from "@/context/theme"
import { IconMoon, IconSun } from "@douyinfe/semi-icons"
import { Radio, RadioGroup, Tooltip } from "@douyinfe/semi-ui"

import "./themeToggle.css"
import { cn } from "@/utils/cls"

export default function ThemeToggle() {
  const { setThemeMode, themeMode } = useTheme()

  const isDark = themeMode === "dark"

  return (
    <Tooltip
      position="bottomLeft"
      trigger="hover"
      content={<ThemePrimarySelect />}
      showArrow={false}
    >
      <div
        className="relative h-4 w-4 cursor-pointer overflow-hidden rounded-full p-4"
        onClick={() => setThemeMode(isDark ? "light" : "dark")}
      >
        <IconMoon
          className={cn("themeIcon themeIconMoon text-teal-600", {
            active: isDark,
          })}
        />
        <IconSun
          className={cn("themeIcon themeIconSun text-orange-600", {
            active: !isDark,
          })}
        />
      </div>
    </Tooltip>
  )
}

function ThemePrimarySelect() {
  const { themeColor, setThemeColor } = useTheme()

  const colors = useMemo(
    () => ["blue", "indigo", "purple", "teal", "violet"],
    []
  )

  return (
    <RadioGroup
      value={themeColor}
      onChange={(e) => setThemeColor(e.target.value as ThemeColor)}
    >
      {colors.map((color) => (
        <Radio value={color} key={color} className="relative">
          <span
            className="absolute left-[4px] top-[6px] h-2 w-2 rounded-full"
            style={{
              background: `rgba(var(--semi-${color}-5), 1)`,
            }}
          />
        </Radio>
      ))}
    </RadioGroup>
  )
}
