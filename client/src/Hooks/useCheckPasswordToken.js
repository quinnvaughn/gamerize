import { useEffect, useState } from 'react'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'

const CHECK_TOKEN = gql`
  mutation($input: CheckUpdatePasswordTokenInput!) {
    checkUpdatePasswordToken(input: $input) {
      valid
    }
  }
`

export default function useCheckPasswordToken(token) {
  const checkUpdatePasswordToken = useMutation(CHECK_TOKEN)
  const [valid, setValid] = useState(null)
  useEffect(() => {
    async function check() {
      const { data } = await checkUpdatePasswordToken({
        variables: { input: { resetPasswordToken: token } },
      })
      if (data.checkUpdatePasswordToken.valid) {
        setValid(true)
      } else {
        setValid(false)
      }
    }
    check()
  }, {})
  return { valid }
}
