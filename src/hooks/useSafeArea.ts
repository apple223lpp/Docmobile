import { useState, useEffect } from 'react'

interface SafeArea {
  top: number
  bottom: number
  left: number
  right: number
}

export function useSafeArea(): SafeArea {
  const [safeArea, setSafeArea] = useState<SafeArea>({ top: 0, bottom: 0, left: 0, right: 0 })

  useEffect(() => {
    const update = () => {
      const style = getComputedStyle(document.documentElement)
      setSafeArea({
        top: parseFloat(style.getPropertyValue('env(safe-area-inset-top)')) || 0,
        bottom: parseFloat(style.getPropertyValue('env(safe-area-inset-bottom)')) || 0,
        left: parseFloat(style.getPropertyValue('env(safe-area-inset-left)')) || 0,
        right: parseFloat(style.getPropertyValue('env(safe-area-inset-right)')) || 0,
      })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return safeArea
}
