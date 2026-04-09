'use client'
import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'korea-travel-favorites'

function readFavorites(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    // Validate: must be an array of strings
    if (Array.isArray(parsed) && parsed.every(id => typeof id === 'string')) {
      return parsed
    }
    // Corrupted data — reset
    localStorage.removeItem(STORAGE_KEY)
    return []
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return []
  }
}

function writeFavorites(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {
    // storage full or unavailable
  }
}

// Global listeners for cross-component sync
const listeners = new Set<() => void>()

function notify() {
  listeners.forEach(fn => fn())
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    setFavorites(readFavorites())
    const handler = () => setFavorites(readFavorites())
    listeners.add(handler)
    // Also listen to storage events from other tabs
    window.addEventListener('storage', handler)
    return () => {
      listeners.delete(handler)
      window.removeEventListener('storage', handler)
    }
  }, [])

  const toggle = useCallback((id: string) => {
    const current = readFavorites()
    const next = current.includes(id)
      ? current.filter(x => x !== id)
      : [...current, id]
    writeFavorites(next)
    setFavorites(next)
    notify()
  }, [])

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites])

  return { favorites, toggle, isFavorite }
}
