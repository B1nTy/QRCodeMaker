'use client'

import Link from 'next/link'
import { QrCode, History, Settings } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Логотип */}
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <QrCode className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              QR Code Maker
            </span>
          </Link>
        </div>

        {/* Навигация */}
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/"
            className="transition-colors hover:text-foreground/80 text-foreground"
          >
            Создать
          </Link>
          <Link
            href="/history"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            История
          </Link>
        </nav>

        {/* Правая часть */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Здесь может быть поиск */}
          </div>
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/history">
                <History className="h-4 w-4" />
                <span className="sr-only">История</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Настройки</span>
              </Link>
            </Button>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
