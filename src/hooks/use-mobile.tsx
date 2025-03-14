
import * as React from "react"

// Updated breakpoints for more precise responsive design
const MOBILE_BREAKPOINT = 900 // Changed from 768px to 900px as requested

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

// Add a new hook for large screens (>1440px)
export function useIsLargeScreen() {
  const [isLargeScreen, setIsLargeScreen] = React.useState<boolean | undefined>(undefined)
  
  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: 1441px)`)
    const onChange = () => {
      setIsLargeScreen(window.innerWidth >= 1441)
    }
    mql.addEventListener("change", onChange)
    setIsLargeScreen(window.innerWidth >= 1441)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isLargeScreen
}
