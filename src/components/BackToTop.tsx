'use client'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { BsArrowUp } from 'react-icons/bs'

const BackToTop = () => {
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false)

  const handleScroll = () => {
    if (window.scrollY >= 200) {
      setShowScrollTop(true)
    } else {
      setShowScrollTop(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <button
      type="button"
      aria-label="Back to top"
      className={clsx('back-top', { 'back-top-show': showScrollTop })}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <BsArrowUp aria-hidden />
    </button>
  )
}

export default BackToTop
