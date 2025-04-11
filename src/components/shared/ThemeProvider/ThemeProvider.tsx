"use client"

import * as React from "react"

type Theme = "light" | "dark" | "system"

interface ThemeProviderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

interface ThemeContextProps {
  theme?: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeContextProps>({
  theme: "system",
  setTheme: () => { },
})

const useTheme = () => React.useContext(ThemeContext)

const ThemeProvider = ({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) => {
  const [theme, setTheme] = React.useState<Theme>(defaultTheme)

  React.useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme | null
    setTheme(storedTheme || defaultTheme)
  }, [defaultTheme, storageKey])

  React.useEffect(() => {
    if (theme === "system") {
      localStorage.removeItem(storageKey)
    } else if (typeof localStorage !== "undefined") {
      localStorage.setItem(storageKey, theme)
    }
  }, [theme, storageKey])

  React.useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div {...props}>{children}</div>
    </ThemeContext.Provider>
  )
}

export { ThemeProvider, useTheme }
