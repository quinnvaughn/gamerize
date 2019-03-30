const { user } = require('./Query/user')
const { auth } = require('./Mutation/auth')
const { gamer } = require('./Mutation/gamer')
const { game } = require('./Mutation/game')
const { game: gameQuery } = require('./Query/game')
const { gamingsession } = require('./Mutation/gamingsession')
const { timeslot: timeSlotQuery } = require('./Query/timeslot')
const { timeslot } = require('./Mutation/timeslot')
const { bookingInvite: bookingInviteQuery } = require('./Query/bookinginvite')
const { gamer: gamerQuery } = require('./Query/gamer')
const { booking: bookingQuery } = require('./Query/booking')
const { gamingsession: gamingSessionQuery } = require('./Query/gamingsession')
const { GamingSession } = require('./Type/GamingSession')
const { GamingTimeSlot } = require('./Type/GamingTimeSlot')
const { User } = require('./Type/User')
const { Node } = require('./Type/Node')
const { BookedPlayer } = require('./Type/BookedPlayer')
const { BookingInvite } = require('./Type/BookingInvite')
const { Booking } = require('./Type/Booking')

module.exports = {
  Query: {
    ...bookingInviteQuery,
    ...bookingQuery,
    ...user,
    ...gamerQuery,
    ...gameQuery,
    ...gamingSessionQuery,
    ...timeSlotQuery,
  },
  Mutation: {
    ...timeslot,
    ...auth,
    ...gamer,
    ...game,
    ...gamingsession,
  },
  User,
  Node,
  GamingSession,
  GamingTimeSlot,
  BookedPlayer,
  BookingInvite,
  Booking,
}
