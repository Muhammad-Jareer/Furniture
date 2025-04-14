"use client"

import { useState, useEffect } from "react"

export function useNavigation() {
  const [currentPath, setCurrentPath] = useState("")

  useEffect(() => {
    // Set initial path
    setCurrentPath(window.location.pathname)

    // Update path on navigation
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener("popstate", handleRouteChange)

    // Custom event for link clicks
    const handleLinkClick = (e) => {
      if (e.target.tagName === "A" && e.target.href) {
        // Extract path from href
        try {
          const url = new URL(e.target.href)
          if (url.origin === window.location.origin) {
            setTimeout(() => {
              setCurrentPath(url.pathname)
            }, 50)
          }
        } catch (error) {
          console.error("Error parsing URL:", error)
        }
      }
    }

    document.addEventListener("click", handleLinkClick)

    return () => {
      window.removeEventListener("popstate", handleRouteChange)
      document.removeEventListener("click", handleLinkClick)
    }
  }, [])

  const isActive = (href) => {
    if (href === "/") {
      return currentPath === "/"
    }
    return currentPath.startsWith(href)
  }

  return {
    currentPath,
    isActive,
    navigate: (path) => {
      setCurrentPath(path)
    },
  }
}

