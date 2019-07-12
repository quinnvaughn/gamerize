import React from 'react'
import { SessionsProvider } from './SessionsSelectedContext'
import { SearchProvider } from './SearchContext'
import { BecomeAGamerProvider } from './BecomeAGamerContext'

export default function AppProviders({ children }) {
  return (
    <SearchProvider>
      <SessionsProvider>
        <BecomeAGamerProvider>{children}</BecomeAGamerProvider>
      </SessionsProvider>
    </SearchProvider>
  )
}
