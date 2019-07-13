import React from 'react'
import { SessionsProvider } from './SessionsSelectedContext'
import { SearchProvider } from './SearchContext'
import { BecomeAGamerProvider } from './BecomeAGamerContext'
import { GamerCalendarProvider } from './GamerCalendarContext'

export default function AppProviders({ children }) {
  return (
    <SearchProvider>
      <SessionsProvider>
        <BecomeAGamerProvider>
          <GamerCalendarProvider>{children}</GamerCalendarProvider>
        </BecomeAGamerProvider>
      </SessionsProvider>
    </SearchProvider>
  )
}
