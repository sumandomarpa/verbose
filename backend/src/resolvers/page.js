export default {
  Query: {
    async pages(parent, args, ctx, info) {
      // 1. Check if they are logged in
      if (!ctx.req.userId) {
        throw new Error('You must be logged in!');
      }
      // 2. Check if the user has the permissions to query all the users
      // hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

      // 2. if they do, query all the users!
      return ctx.prisma.pages({}, info);
    },
  },
  Mutation: {
    async addPage (parent, args, ctx, info) {
      const page = await ctx.prisma.createPage({
        ...args
      })

      return page
    },
    async addBlock (parent, args, ctx, info) {
      const { title, content, image, video, style } = args

      const block = await ctx.prisma.createBlock({
        title,
        content,
        image,
        video,
        style,
        page: {
          connect: {
            id: args.pageId
          }
        }
      }, info)

      return block
    }
  }
}