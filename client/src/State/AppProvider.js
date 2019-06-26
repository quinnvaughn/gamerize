import React from 'react'
import { SessionsProvider } from './SessionsSelectedContext'

export default function AppProviders({ children }) {
  return <SessionsProvider>{children}</SessionsProvider>
}
