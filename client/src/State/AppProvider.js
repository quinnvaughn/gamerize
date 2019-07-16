import React from 'react'
import { SessionsProvider } from './SessionsSelectedContext'
import { SearchProvider } from './SearchContext'
import { BecomeAGamerProvider } from './BecomeAGamerContext'
import { SessionCalendarProvider } from './SessionCalendarContext'

export default function AppProviders({ children }) {
  return (
    <SearchProvider>
      <SessionsProvider>
        <BecomeAGamerProvider>
          <SessionCalendarProvider>{children}</SessionCalendarProvider>
        </BecomeAGamerProvider>
      </SessionsProvider>
    </SearchProvider>
  )
}
