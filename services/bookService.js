const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

class BookService {
    getAll(limit, offset, search, category, status){
        return prisma.book.findMany({
            where: {
            name: {
                contains: search
            },
            status,
            ...(category && {
                categories: {
                some: {
                    category: {
                    name: {
                        contains: category
                    }
                    }
                }
                }
            })
            },
            skip: offset,
            take: limit,
            select: {
            id: true,
            name: true,
            stock: true,
            imageurl: true,
            categories: {
                select: {
                category: {
                    select: {
                    name: true
                    }
                }
                }
            }
            }
        });
    }
    
    getById(id){
        return prisma.book.findUnique({
            where: {
            id
            },
            select: {
            name: true,
            description: true,
            imageurl: true,
            location: true,
            stock: true,
            categories: {
                select: {
                category: {
                    select: {
                    name: true
                    }
                }
                }
            },
            comment_book: {
                select: {
                id: true,
                description: true,
                user: {
                    select: {
                    id: true,
                    email: true,
                    profile: {
                        select: {
                        nama: true,
                        photo: true,
                        }
                    }
                    }
                }
                }
            },
            }
        });
    }

    create(name, description, stock, location, imageurl, categoryArray){
        const book = prisma.book.create({
            data: {
              name,
              description,
              stock: parseInt(stock),
              location,
              status: "DITERIMA",
              imageurl,
              categories: {
                create: categoryArray.map(categoryId => ({
                  category: { connect: { id: categoryId } },
                })),
              },
            },
          });
    }
}

module.exports = new BookService();