'use client'

import { useState, useEffect, useCallback } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const STORAGE_KEY = 'a2hs-dismissed'

function isStandalone() {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    ('standalone' in navigator && (navigator as unknown as { standalone: boolean }).standalone)
  )
}

function isIOS() {
  if (typeof navigator === 'undefined') return false
  return /iphone|ipad|ipod/i.test(navigator.userAgent)
}

export default function AddToHomeScreen() {
  const [show, setShow] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isIOSDevice, setIsIOSDevice] = useState(false)

  useEffect(() => {
    if (isStandalone()) return
    if (localStorage.getItem(STORAGE_KEY)) return

    setIsIOSDevice(isIOS())

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShow(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    // iOS doesn't fire beforeinstallprompt — show after a delay
    const timer = setTimeout(() => {
      if (isIOS()) setShow(true)
    }, 3000)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
      clearTimeout(timer)
    }
  }, [])

  const dismiss = useCallback(() => {
    setShow(false)
    localStorage.setItem(STORAGE_KEY, '1')
  }, [])

  const install = useCallback(async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      localStorage.setItem(STORAGE_KEY, '1')
    }
    setDeferredPrompt(null)
    setShow(false)
  }, [deferredPrompt])

  if (!show) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-[60] p-4 animate-slide-up" role="dialog" aria-label="加入主畫面提示">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-5">
        <div className="flex items-start gap-3">
          <div className="text-3xl shrink-0">🇰🇷</div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900">加到手機主畫面</p>
            {isIOSDevice ? (
              <p className="text-sm text-gray-500 mt-1">
                點下方 <span className="inline-flex items-center"><ShareIcon /></span> 分享按鈕，再選「<strong>加入主畫面</strong>」即可像 App 一樣開啟
              </p>
            ) : (
              <p className="text-sm text-gray-500 mt-1">
                一鍵加入桌面，下次像開 App 一樣直接查行程
              </p>
            )}
          </div>
          <button
            onClick={dismiss}
            className="shrink-0 p-1 text-gray-400 hover:text-gray-600"
            aria-label="關閉"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {!isIOSDevice && deferredPrompt && (
          <button
            onClick={install}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            加入主畫面
          </button>
        )}

        {isIOSDevice && (
          <button
            onClick={dismiss}
            className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium py-3 rounded-xl transition-colors text-sm"
          >
            我知道了
          </button>
        )}
      </div>
    </div>
  )
}

function ShareIcon() {
  return (
    <svg className="w-4 h-4 mx-0.5 text-blue-500 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 3v12M8 7l4-4 4 4" />
    </svg>
  )
}
