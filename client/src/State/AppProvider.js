import React from 'react'
import { SessionsProvider } from './SessionsSelectedContext'
import { SearchProvider } from './SearchContext'

export default function AppProviders({ children }) {
  return (
    <SearchProvider>
      <SessionsProvider>{children}</SessionsProvider>
    </SearchProvider>
  )
}
