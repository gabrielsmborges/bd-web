import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/theme-provider'
import { dark } from '@clerk/themes'

import '@repo/ui/globals.css'
import { NextIntlClientProvider } from 'next-intl'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <NextIntlClientProvider>
      <ClerkProvider
        appearance={{
          baseTheme: dark
        }}
      >
        <html lang="en" suppressHydrationWarning className="overflow-y-hidden">
          <body className="antialiased">
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </NextIntlClientProvider>
  )
}
