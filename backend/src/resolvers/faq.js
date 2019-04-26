export default {
    Query: {
        async faqs(parent, args, ctx, info) {
          // 1. Check if they are logged in
          if (!ctx.req.userId) {
            throw new Error('You must be logged in!');
          }
          // 2. Check if the user has the permissions to query all the users
          // hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
    
          // 2. if they do, query all the faqs!
          return ctx.prisma.faqs({ orderBy: 'createdAt_DESC' }, info);
        },
        async faq(parent, args, ctx, info) {
          return ctx.prisma.faq(args, info);
        },
      },

    Mutation: {
        async addFaq (parent, args, ctx, info) {
            const { title, description, short_description, slug, vertical, category = [], readingTime, order, variant, tag, authors } = args
            const faq = await ctx.prisma.createFaq({
              title,
              description,
              short_description,
              slug,
              vertical,
              category: {
                connect: category.map((categoryId) => {return {id: categoryId}})
              },
              readingTime,
              order,
              variant,
              tag,
              authors: {
                connect: authors.map((authorId) => {return {id: authorId}})
              },
              pubDate: new Date().toISOString()
            }, info)
      
            return faq
        },
        async updateFaq (parent, args, ctx, info) {
            const { id, title, description, short_description, slug, vertical, category = [], readingTime, order, variant, tag, authors } = args
      
            /** Executing the query */
            const faq = await ctx.prisma.updateFaq({
              data: {
                title,
                description,
                short_description,
                slug,
                vertical,
                category: {
                    connect: category.map((categoryId) => {return {id: categoryId}})
                },
                readingTime,
                order,
                variant,
                tag,
                authors: {
                  connect: authors.map((authorId) => {return {id: authorId}})
                },
              },
              where: { id }
            }, info)
      
            return faq
          },

    }
}