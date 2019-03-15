const Node = {
  __resolveType(obj, ctx, info) {
    return obj.__typename
  },
}

module.exports = {
  Node,
}
