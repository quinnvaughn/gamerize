import { useEffect } from 'react'

export default function useNotifications(callback, delay) {
  const token = localStorage.getItem('TOKEN')
  useEffect(() => {
    if (!('Notification' in window)) {
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === 'granted') {
      // If it's okay let's create a notification
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function(permission) {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
        }
      })
    }
  }, [token])
}
