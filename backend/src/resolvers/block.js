export default {
  Query: {
  },
  Mutation: {
    async upsertBlock (parent, args, ctx, info) {
      const { id, page,  title, image, video, style, content, order } = args

      const block = await ctx.prisma.upsertBlock({
        where: {
          id
        },
        update: {
          page: {
            connect: { id: page }
          },
          title,
          image,
          video,
          style,
          content,
          order,
        },
        create: {
          page: {
            connect: { id: page }
          },
          title,
          image,
          video,
          style,
          content,
          order,
        }
      })

      return block
    },
    async deleteBlock (parent, args, ctx, info) {
      const { id } = args

      const block = await ctx.prisma.deleteBlock({
        id
      }, info)
      console.log(args, 'block');

      return block
    },
  }
}