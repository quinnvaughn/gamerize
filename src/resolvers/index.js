const { user } = require('./Query/user')
const { auth } = require('./Mutation/auth')
const { gamer } = require('./Mutation/gamer')
const { game } = require('./Mutation/game')
const { notification: notificationQuery } = require('./Query/notification')
const { notification } = require('./Mutation/notification')
const { game: gameQuery } = require('./Query/game')
const { gamingsession } = require('./Mutation/gamingsession')
const { timeslot: timeSlotQuery } = require('./Query/timeslot')
const { timeslot } = require('./Mutation/timeslot')
const { bookingInvite: bookingInviteQuery } = require('./Query/bookinginvite')
const { bookingInvite } = require('./Mutation/bookinginvite')
const { gamer: gamerQuery } = require('./Query/gamer')
const { booking } = require('./Mutation/booking')
const { booking: bookingQuery } = require('./Query/booking')
const { gamingsession: gamingSessionQuery } = require('./Query/gamingsession')
const { friendrequest: friendRequestQuery } = require('./Query/friendrequest')
const { friendrequest } = require('./Mutation/friendrequest')
const { GamingSession } = require('./Type/GamingSession')
const { GamingTimeSlot } = require('./Type/GamingTimeSlot')
const { User } = require('./Type/User')
const { Node } = require('./Type/Node')
const { BookedPlayer } = require('./Type/BookedPlayer')
const { BookingInvite } = require('./Type/BookingInvite')
const { Booking } = require('./Type/Booking')
const { Notification } = require('./Type/Notification')
const { FriendRequest } = require('./Type/FriendRequest')

module.exports = {
  Query: {
    ...notificationQuery,
    ...friendRequestQuery,
    ...bookingInviteQuery,
    ...bookingQuery,
    ...user,
    ...gamerQuery,
    ...gameQuery,
    ...gamingSessionQuery,
    ...timeSlotQuery,
  },
  Mutation: {
    ...notification,
    ...friendrequest,
    ...booking,
    ...bookingInvite,
    ...timeslot,
    ...auth,
    ...gamer,
    ...game,
    ...gamingsession,
  },
  User,
  Notification,
  Node,
  GamingSession,
  GamingTimeSlot,
  BookedPlayer,
  BookingInvite,
  Booking,
  FriendRequest,
}
