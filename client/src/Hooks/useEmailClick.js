import { useEffect } from 'react'
import { Mixpanel } from '../Components/Mixpanel';

export default function useEmailClick(title) {
  useEffect(() => {
    if(window.location.href.indexOf("emailclick") > -1){
        Mixpanel.track("Email link clicked", {
             "Link name": window.location.href.split("emailclick=")[1]
        });
    }
  }, {})
}
