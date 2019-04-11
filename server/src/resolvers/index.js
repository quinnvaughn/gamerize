const { user } = require('./Query/user')
const { auth } = require('./Mutation/auth')
const { game } = require('./Mutation/game')
const { notification: notificationQuery } = require('./Query/notification')
const { notification } = require('./Mutation/notification')
const { gamerrequest } = require('./Mutation/gamerrequest')
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
const { gamer } = require('./Mutation/gamer')
const { GamingSession } = require('./Type/GamingSession')
const { GamingTimeSlot } = require('./Type/GamingTimeSlot')
const { User } = require('./Type/User')
const { Node } = require('./Type/Node')
const { BookedPlayer } = require('./Type/BookedPlayer')
const { BookingInvite } = require('./Type/BookingInvite')
const { Booking } = require('./Type/Booking')
const { Notification } = require('./Type/Notification')
const { FriendRequest } = require('./Type/FriendRequest')
const { GamerTag } = require('./Type/GamerTag')
const { Game } = require('./Type/Game')

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
    ...gamer,
    ...gamerrequest,
    ...notification,
    ...friendrequest,
    ...booking,
    ...bookingInvite,
    ...timeslot,
    ...auth,
    ...game,
    ...gamingsession,
  },
  Game,
  GamerTag,
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
