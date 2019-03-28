"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "UserIndex",
    embedded: false
  },
  {
    name: "GamerRequest",
    embedded: false
  },
  {
    name: "SocialMedia",
    embedded: false
  },
  {
    name: "Game",
    embedded: false
  },
  {
    name: "GameIndex",
    embedded: false
  },
  {
    name: "GamingSession",
    embedded: false
  },
  {
    name: "GamingSessionIndex",
    embedded: false
  },
  {
    name: "Requirement",
    embedded: false
  },
  {
    name: "Discount",
    embedded: false
  },
  {
    name: "SessionReview",
    embedded: false
  },
  {
    name: "SessionReviewIndex",
    embedded: false
  },
  {
    name: "GamingTimeSlot",
    embedded: false
  },
  {
    name: "Occupations",
    embedded: false
  },
  {
    name: "Tags",
    embedded: false
  },
  {
    name: "TypeOfGame",
    embedded: false
  },
  {
    name: "System",
    embedded: false
  },
  {
    name: "PlayerOrSession",
    embedded: false
  },
  {
    name: "Booking",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://localhost:4466`
});
exports.prisma = new exports.Prisma();
