module.exports = {
        typeDefs: /* GraphQL */ `type AggregateBlock {
  count: Int!
}

type AggregatePage {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Block {
  id: ID!
  page: Page!
  title: String
  image: String
  video: String
  style: String
  content: String
}

type BlockConnection {
  pageInfo: PageInfo!
  edges: [BlockEdge]!
  aggregate: AggregateBlock!
}

input BlockCreateInput {
  page: PageCreateOneWithoutBlocksInput!
  title: String
  image: String
  video: String
  style: String
  content: String
}

input BlockCreateManyWithoutPageInput {
  create: [BlockCreateWithoutPageInput!]
  connect: [BlockWhereUniqueInput!]
}

input BlockCreateWithoutPageInput {
  title: String
  image: String
  video: String
  style: String
  content: String
}

type BlockEdge {
  node: Block!
  cursor: String!
}

enum BlockOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  image_ASC
  image_DESC
  video_ASC
  video_DESC
  style_ASC
  style_DESC
  content_ASC
  content_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type BlockPreviousValues {
  id: ID!
  title: String
  image: String
  video: String
  style: String
  content: String
}

type BlockSubscriptionPayload {
  mutation: MutationType!
  node: Block
  updatedFields: [String!]
  previousValues: BlockPreviousValues
}

input BlockSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: BlockWhereInput
  AND: [BlockSubscriptionWhereInput!]
  OR: [BlockSubscriptionWhereInput!]
  NOT: [BlockSubscriptionWhereInput!]
}

input BlockUpdateInput {
  page: PageUpdateOneRequiredWithoutBlocksInput
  title: String
  image: String
  video: String
  style: String
  content: String
}

input BlockUpdateManyMutationInput {
  title: String
  image: String
  video: String
  style: String
  content: String
}

input BlockUpdateManyWithoutPageInput {
  create: [BlockCreateWithoutPageInput!]
  delete: [BlockWhereUniqueInput!]
  connect: [BlockWhereUniqueInput!]
  disconnect: [BlockWhereUniqueInput!]
  update: [BlockUpdateWithWhereUniqueWithoutPageInput!]
  upsert: [BlockUpsertWithWhereUniqueWithoutPageInput!]
}

input BlockUpdateWithoutPageDataInput {
  title: String
  image: String
  video: String
  style: String
  content: String
}

input BlockUpdateWithWhereUniqueWithoutPageInput {
  where: BlockWhereUniqueInput!
  data: BlockUpdateWithoutPageDataInput!
}

input BlockUpsertWithWhereUniqueWithoutPageInput {
  where: BlockWhereUniqueInput!
  update: BlockUpdateWithoutPageDataInput!
  create: BlockCreateWithoutPageInput!
}

input BlockWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  page: PageWhereInput
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  video: String
  video_not: String
  video_in: [String!]
  video_not_in: [String!]
  video_lt: String
  video_lte: String
  video_gt: String
  video_gte: String
  video_contains: String
  video_not_contains: String
  video_starts_with: String
  video_not_starts_with: String
  video_ends_with: String
  video_not_ends_with: String
  style: String
  style_not: String
  style_in: [String!]
  style_not_in: [String!]
  style_lt: String
  style_lte: String
  style_gt: String
  style_gte: String
  style_contains: String
  style_not_contains: String
  style_starts_with: String
  style_not_starts_with: String
  style_ends_with: String
  style_not_ends_with: String
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  AND: [BlockWhereInput!]
  OR: [BlockWhereInput!]
  NOT: [BlockWhereInput!]
}

input BlockWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createBlock(data: BlockCreateInput!): Block!
  updateBlock(data: BlockUpdateInput!, where: BlockWhereUniqueInput!): Block
  updateManyBlocks(data: BlockUpdateManyMutationInput!, where: BlockWhereInput): BatchPayload!
  upsertBlock(where: BlockWhereUniqueInput!, create: BlockCreateInput!, update: BlockUpdateInput!): Block!
  deleteBlock(where: BlockWhereUniqueInput!): Block
  deleteManyBlocks(where: BlockWhereInput): BatchPayload!
  createPage(data: PageCreateInput!): Page!
  updatePage(data: PageUpdateInput!, where: PageWhereUniqueInput!): Page
  updateManyPages(data: PageUpdateManyMutationInput!, where: PageWhereInput): BatchPayload!
  upsertPage(where: PageWhereUniqueInput!, create: PageCreateInput!, update: PageUpdateInput!): Page!
  deletePage(where: PageWhereUniqueInput!): Page
  deleteManyPages(where: PageWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type Page {
  id: ID!
  title: String!
  image: String
  slug: String!
  type: PageType!
  vertical: String
  blocks(where: BlockWhereInput, orderBy: BlockOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Block!]
}

type PageConnection {
  pageInfo: PageInfo!
  edges: [PageEdge]!
  aggregate: AggregatePage!
}

input PageCreateInput {
  title: String!
  image: String
  slug: String!
  type: PageType!
  vertical: String
  blocks: BlockCreateManyWithoutPageInput
}

input PageCreateOneWithoutBlocksInput {
  create: PageCreateWithoutBlocksInput
  connect: PageWhereUniqueInput
}

input PageCreateWithoutBlocksInput {
  title: String!
  image: String
  slug: String!
  type: PageType!
  vertical: String
}

type PageEdge {
  node: Page!
  cursor: String!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

enum PageOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  image_ASC
  image_DESC
  slug_ASC
  slug_DESC
  type_ASC
  type_DESC
  vertical_ASC
  vertical_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type PagePreviousValues {
  id: ID!
  title: String!
  image: String
  slug: String!
  type: PageType!
  vertical: String
}

type PageSubscriptionPayload {
  mutation: MutationType!
  node: Page
  updatedFields: [String!]
  previousValues: PagePreviousValues
}

input PageSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PageWhereInput
  AND: [PageSubscriptionWhereInput!]
  OR: [PageSubscriptionWhereInput!]
  NOT: [PageSubscriptionWhereInput!]
}

enum PageType {
  PAGE
  NEWS
  ARTICLE
}

input PageUpdateInput {
  title: String
  image: String
  slug: String
  type: PageType
  vertical: String
  blocks: BlockUpdateManyWithoutPageInput
}

input PageUpdateManyMutationInput {
  title: String
  image: String
  slug: String
  type: PageType
  vertical: String
}

input PageUpdateOneRequiredWithoutBlocksInput {
  create: PageCreateWithoutBlocksInput
  update: PageUpdateWithoutBlocksDataInput
  upsert: PageUpsertWithoutBlocksInput
  connect: PageWhereUniqueInput
}

input PageUpdateWithoutBlocksDataInput {
  title: String
  image: String
  slug: String
  type: PageType
  vertical: String
}

input PageUpsertWithoutBlocksInput {
  update: PageUpdateWithoutBlocksDataInput!
  create: PageCreateWithoutBlocksInput!
}

input PageWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  slug: String
  slug_not: String
  slug_in: [String!]
  slug_not_in: [String!]
  slug_lt: String
  slug_lte: String
  slug_gt: String
  slug_gte: String
  slug_contains: String
  slug_not_contains: String
  slug_starts_with: String
  slug_not_starts_with: String
  slug_ends_with: String
  slug_not_ends_with: String
  type: PageType
  type_not: PageType
  type_in: [PageType!]
  type_not_in: [PageType!]
  vertical: String
  vertical_not: String
  vertical_in: [String!]
  vertical_not_in: [String!]
  vertical_lt: String
  vertical_lte: String
  vertical_gt: String
  vertical_gte: String
  vertical_contains: String
  vertical_not_contains: String
  vertical_starts_with: String
  vertical_not_starts_with: String
  vertical_ends_with: String
  vertical_not_ends_with: String
  blocks_every: BlockWhereInput
  blocks_some: BlockWhereInput
  blocks_none: BlockWhereInput
  AND: [PageWhereInput!]
  OR: [PageWhereInput!]
  NOT: [PageWhereInput!]
}

input PageWhereUniqueInput {
  id: ID
}

enum Permission {
  ADMIN
  USER
}

type Query {
  block(where: BlockWhereUniqueInput!): Block
  blocks(where: BlockWhereInput, orderBy: BlockOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Block]!
  blocksConnection(where: BlockWhereInput, orderBy: BlockOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): BlockConnection!
  page(where: PageWhereUniqueInput!): Page
  pages(where: PageWhereInput, orderBy: PageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Page]!
  pagesConnection(where: PageWhereInput, orderBy: PageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PageConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  block(where: BlockSubscriptionWhereInput): BlockSubscriptionPayload
  page(where: PageSubscriptionWhereInput): PageSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  name: String!
  email: String!
  password: String!
  resetToken: String
  resetTokenExpiry: Float
  permissions: [Permission!]!
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  name: String!
  email: String!
  password: String!
  resetToken: String
  resetTokenExpiry: Float
  permissions: UserCreatepermissionsInput
}

input UserCreatepermissionsInput {
  set: [Permission!]
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  resetToken_ASC
  resetToken_DESC
  resetTokenExpiry_ASC
  resetTokenExpiry_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  name: String!
  email: String!
  password: String!
  resetToken: String
  resetTokenExpiry: Float
  permissions: [Permission!]!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  name: String
  email: String
  password: String
  resetToken: String
  resetTokenExpiry: Float
  permissions: UserUpdatepermissionsInput
}

input UserUpdateManyMutationInput {
  name: String
  email: String
  password: String
  resetToken: String
  resetTokenExpiry: Float
  permissions: UserUpdatepermissionsInput
}

input UserUpdatepermissionsInput {
  set: [Permission!]
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  resetToken: String
  resetToken_not: String
  resetToken_in: [String!]
  resetToken_not_in: [String!]
  resetToken_lt: String
  resetToken_lte: String
  resetToken_gt: String
  resetToken_gte: String
  resetToken_contains: String
  resetToken_not_contains: String
  resetToken_starts_with: String
  resetToken_not_starts_with: String
  resetToken_ends_with: String
  resetToken_not_ends_with: String
  resetTokenExpiry: Float
  resetTokenExpiry_not: Float
  resetTokenExpiry_in: [Float!]
  resetTokenExpiry_not_in: [Float!]
  resetTokenExpiry_lt: Float
  resetTokenExpiry_lte: Float
  resetTokenExpiry_gt: Float
  resetTokenExpiry_gte: Float
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`
      }
    