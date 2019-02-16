import Query from './Query'
import auth from './Mutation/auth'
import AuthPayload from './AuthPayload'

module.exports = {
  Query,
  Mutation: {
    ...auth,
  },
  AuthPayload,
}
