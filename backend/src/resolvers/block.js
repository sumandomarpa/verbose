export default {
  Query: {
  },
  Mutation: {
    async upsertBlock (parent, args, ctx, info) {
      const { id, page, media, title, image, video, style, content, order } = args

      const mediaQuery = media ? { connect: { id: media } } : null

      const block = await ctx.prisma.upsertBlock({
        where: {
          id
        },
        update: {
          page: {
            connect: { id: page }
          },
          media: mediaQuery,
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
          media: mediaQuery,
          title,
          image,
          video,
          style,
          content,
          order,
        }
      })

      // disconnecting the media if not provied
      if (block.id && !media) {
        await ctx.prisma.updateBlock({
          where: {
            id
          },
          data: {
            media:
            {
              disconnect: true
            },
          }
        })
      }

      return block
    },
    async deleteBlock (parent, args, ctx, info) {
      const { id } = args

      const block = await ctx.prisma.deleteBlock({
        id
      }, info)

      return block
    },
  },
  Block: {
    media: (parent, args, ctx, info) => {
      return ctx.prisma.block({
        id: parent.id
      }, info).media()
    }
  }
}