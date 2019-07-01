import { Mixpanel } from '../Components/Mixpanel'
import { useEffect } from 'react'

export default function useMixpanelTrack(text) {
  useEffect(() => {
    Mixpanel.track(text)
  }, {})
}
