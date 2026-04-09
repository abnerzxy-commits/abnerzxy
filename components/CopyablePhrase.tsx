'use client'
import { useState, useRef, useEffect } from 'react'

interface Props {
  situation: string
  korean: string
}

export default function CopyablePhrase({ situation, korean }: Props) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(korean)
      setCopied(true)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setCopied(false), 1500)
    } catch {
      // Fallback: select text for manual copy
      const el = document.getElementById(`phrase-${korean}`)
      if (el) {
        const range = document.createRange()
        range.selectNodeContents(el)
        window.getSelection()?.removeAllRanges()
        window.getSelection()?.addRange(range)
      }
    }
  }

  return (
    <div
      className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-all active:scale-[0.99]"
      onClick={handleCopy}
    >
      <div className="px-4 py-2 bg-gray-100 border-b border-gray-200 flex items-center justify-between">
        <p className="text-xs text-gray-500 font-medium">{situation}</p>
        <span className={`text-xs font-medium transition-all ${copied ? 'text-green-600' : 'text-gray-400'}`}>
          {copied ? '✅ 已複製！' : '📋 點擊複製'}
        </span>
      </div>
      <div className="px-4 py-4">
        <p id={`phrase-${korean}`} className="text-3xl font-bold text-gray-900 leading-tight tracking-wide select-all">
          {korean}
        </p>
      </div>
    </div>
  )
}
