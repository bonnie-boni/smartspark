'use client'

import { useState } from 'react'
import { Menu, X, Zap, Sun, Moon } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from '../lib/ThemeContext'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-200/80 bg-gray-100/90 shadow-sm backdrop-blur-md dark:border-primary-800/80 dark:bg-primary-950/90 transition-colors duration-300">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link href="/" className="flex items-center gap-3 px-1 py-1 transition-colors">
            <img src="/images/logo/logo.webp" alt="" className="flex h-9 w-9 items-center justify-center rounded-full" />
            <div className="hidden sm:block">
              <h1 className="text-base font-semibold tracking-tight text-slate-900 transition-colors dark:text-white md:text-lg">SmartSpark Services</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">AI, web, design, and automation</p>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <div className="flex items-center gap-1 px-2 py-2">
              <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 px-2 lg:px-3 py-2 text-sm font-medium transition-colors">Home</Link>
              <Link href="/about" className="text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 px-2 lg:px-3 py-2 text-sm font-medium transition-colors">About</Link>
              <Link href="/services" className="text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 px-2 lg:px-3 py-2 text-sm font-medium transition-colors">Services</Link>
              <Link href="/portfolio" className="text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 px-2 lg:px-3 py-2 text-sm font-medium transition-colors">Portfolio</Link>
              <Link href="/blog" className="text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 px-2 lg:px-3 py-2 text-sm font-medium transition-colors">Blog</Link>
              <Link href="/contact" className="bg-primary-700 text-white px-3 lg:px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors">Get a Quote</Link>
            </div>
            <button
              onClick={toggleTheme}
              className="rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-950 dark:border-primary-800 dark:bg-primary-900 dark:text-slate-200 dark:hover:bg-primary-800 dark:hover:text-white"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
          
          <div className="flex items-center space-x-1 md:hidden">
            <button
              onClick={toggleTheme}
              className="rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-950 dark:border-primary-800 dark:bg-primary-900 dark:text-slate-200 dark:hover:bg-primary-800 dark:hover:text-white"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-950 dark:border-primary-800 dark:bg-primary-900 dark:text-slate-200 dark:hover:bg-primary-800 dark:hover:text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        
        {isOpen && (
          <div className="md:hidden">
            <div className="space-y-1 border-t border-slate-200 bg-white px-2 pb-3 pt-2 transition-colors dark:border-primary-800 dark:bg-primary-900 sm:px-3">
              <Link href="/" onClick={() => setIsOpen(false)} className="block rounded-lg px-3 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-primary-800 dark:hover:text-white">Home</Link>
              <Link href="/about" onClick={() => setIsOpen(false)} className="block text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 px-3 py-3 text-base font-medium transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-primary-700">About</Link>
              <Link href="/services" onClick={() => setIsOpen(false)} className="block text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 px-3 py-3 text-base font-medium transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-primary-700">Services</Link>
              <Link href="/portfolio" onClick={() => setIsOpen(false)} className="block text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 px-3 py-3 text-base font-medium transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-primary-700">Portfolio</Link>
              <Link href="/blog" onClick={() => setIsOpen(false)} className="block text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 px-3 py-3 text-base font-medium transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-primary-700">Blog</Link>
              <Link href="/contact" onClick={() => setIsOpen(false)} className="block bg-primary-700 text-white px-3 py-3 text-base font-medium rounded-lg mt-2 text-center hover:bg-primary-600 transition-colors">Get a Quote</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}