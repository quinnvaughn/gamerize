import { useEffect } from 'react'
import { Mixpanel } from '../Components/Mixpanel';

export default function useTwitterClick(title) {
  useEffect(() => {
    if(window.location.href.indexOf("twitterclick") > -1){
        Mixpanel.track("Twitter link clicked", {
             "Link name": window.location.href.split("twitterclick=")[1]
        });
    }
  }, {})
}
