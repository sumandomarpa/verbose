import differenceBy from 'lodash/differenceBy'
import intersectionBy from 'lodash/intersectionBy'
import omit from 'lodash/omit'

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
    async page(parent, args, ctx, info) {
      return ctx.prisma.page(args, info);
    },
  },
  Mutation: {
    async addPage (parent, args, ctx, info) {
      const { title, slug, image, type, vertical, blocks, boxes } = args

      const page = await ctx.prisma.createPage({
        title,
        image,
        slug,
        type,
        vertical,
        blocks: {
          create: blocks
        },
        boxes: {
          create: boxes
        }
      }, info)

      return page
    },
    async updatePage (parent, args, ctx, info) {
      const { id, title, slug, image, type, vertical, blocks, boxes } = args

      /** get all the existing blocks */
      const existingBlocks = await ctx.prisma.page({ id }).blocks()

      let blocksQuery = {};
      let blocksUpdate = []
      let blocksCreate = []
      let blocksDelete = []

      // preparing the query
      const blocksToCreate = differenceBy(blocks, existingBlocks, 'id')
      const blocksToDelete = differenceBy(existingBlocks, blocks, 'id')
      const blocksToUpdate = intersectionBy(blocks, existingBlocks, 'id')

      blocksCreate = blocksToCreate.map(block => { return omit(block, 'id')})
      blocksDelete = blocksToDelete.map(block => { return { id: block.id } })
      blocksUpdate = blocksToUpdate.map(block => {
        return {
          where: {
            id: block.id
          },
          data: omit(block, 'id')
        }
      })
      
      blocksQuery = {
        update: blocksUpdate,
        create: blocksCreate,
        delete: blocksDelete
      }

      /** get all the existing boxes */
      const existingBoxes = await ctx.prisma.page({ id }).boxes()

      let boxesQuery = {};
      let boxesUpdate = []
      let boxesCreate = []
      let boxesDelete = []

      // preparing the query
      const boxesToCreate = differenceBy(boxes, existingBoxes, 'id')
      const boxesToDelete = differenceBy(existingBoxes, boxes, 'id')
      const boxesToUpdate = intersectionBy(boxes, existingBoxes, 'id')

      boxesCreate = boxesToCreate.map(box => { return omit(box, 'id')})
      boxesDelete = boxesToDelete.map(box => { return { id: box.id } })
      boxesUpdate = boxesToUpdate.map(box => {
        return {
          where: {
            id: box.id
          },
          data: omit(box, 'id')
        }
      })
      
      boxesQuery = {
        update: boxesUpdate,
        create: boxesCreate,
        delete: boxesDelete
      }

      /** Executing the query */
      const page = await ctx.prisma.updatePage({
        data: {
          title,
          image,
          slug,
          type,
          vertical,
          blocks: blocksQuery,
          boxes: boxesQuery
        },
        where: { id }
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

      return block
    }
  },
  Page: {
    blocks: (parent, args, ctx, info) => {
      return ctx.prisma.page({
        id: parent.id
      }).blocks()
    },
    boxes: (parent, args, ctx, info) => {
      return ctx.prisma.page({
        id: parent.id
      }).boxes()
    }
  }
}