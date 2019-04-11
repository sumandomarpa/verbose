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
      const { title, slug, image, type, vertical, blocks } = args

      const page = await ctx.prisma.createPage({
        title,
        image,
        slug,
        type,
        vertical,
        blocks: {
          create: blocks
        }
      }, info)

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

      console.log('block', block)
      return block
    }
  },
  Page: {
    blocks: (parent, args, ctx, info) => {
      console.log(parent)
      return ctx.prisma.page({
        id: parent.id
      }).blocks()
    }
  }
}