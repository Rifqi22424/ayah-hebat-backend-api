const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.$transaction([
    prisma.infaq.deleteMany(),
    prisma.allocationType.deleteMany(),
    prisma.errorLog.deleteMany(),
    prisma.bookCategories.deleteMany(),
    prisma.category.deleteMany(),
    prisma.peminjaman.deleteMany(),
    prisma.commentBook.deleteMany(),
    prisma.officeAddress.deleteMany(),
    prisma.book.deleteMany(),
    prisma.userDeleted.deleteMany(),
    prisma.replyLike.deleteMany(),
    prisma.reply.deleteMany(),
    prisma.commentLike.deleteMany(),
    prisma.comment.deleteMany(),
    prisma.postDislike.deleteMany(),
    prisma.postLike.deleteMany(),
    prisma.post.deleteMany(),
    prisma.news.deleteMany(),
    prisma.notification.deleteMany(),
    prisma.question.deleteMany(),
    prisma.kegiatan.deleteMany(),
    prisma.profile.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // Create Users
  const users = [];
  for (let i = 1; i <= 10; i++) {
    const user = await prisma.user.create({
      data: {
        username: `user${i}`,
        email: `user${i}@example.com`,
        password: await bcrypt.hash('password123', 10),
        isVerified: true,
        role: i === 1 ? 'ADMIN' : 'USER',
        totalScoreYear: Math.floor(Math.random() * 1000),
        totalScoreMonth: Math.floor(Math.random() * 100),
        totalScoreDay: Math.floor(Math.random() * 10),
        profile: {
          create: {
            nama: `User ${i} Full Name`,
            bio: `Bio for user ${i}`,
            photo: `dummy_photos.jpg`,
            namaIstri: `Wife of User ${i}`,
            namaKuttab: `Kuttab ${i}`,
            namaAnak: `Child of User ${i}`,
            tahunMasukKuttab: 2020 + i,
          },
        },
      },
    });
    users.push(user);
  }

  // Create Posts
  const posts = [];
  for (let i = 1; i <= 10; i++) {
    const post = await prisma.post.create({
      data: {
        userId: users[Math.floor(Math.random() * users.length)].id,
        body: `This is post content ${i}. Lorem ipsum dolor sit amet.`,
      },
    });
    posts.push(post);
  }

  // Create Comments
  const comments = [];
  for (let i = 1; i <= 10; i++) {
    const comment = await prisma.comment.create({
      data: {
        userId: users[Math.floor(Math.random() * users.length)].id,
        postId: posts[Math.floor(Math.random() * posts.length)].id,
        body: `This is comment ${i} on the post.`,
      },
    });
    comments.push(comment);
  }

  // Create Replies
  for (let i = 1; i <= 10; i++) {
    await prisma.reply.create({
      data: {
        userId: users[Math.floor(Math.random() * users.length)].id,
        commentId: comments[Math.floor(Math.random() * comments.length)].id,
        body: `This is reply ${i} to the comment.`,
      },
    });
  }

  // Create Categories
  const categories = [];
  const categoryNames = ['Fiction', 'Non-Fiction', 'Science', 'History', 'Religion', 'Technology', 'Art', 'Philosophy', 'Education', 'Literature'];
  for (let i = 0; i < 10; i++) {
    const category = await prisma.category.create({
      data: {
        name: categoryNames[i],
      },
    });
    categories.push(category);
  }

  // Create Books
  const books = [];
  for (let i = 1; i <= 10; i++) {
    const book = await prisma.book.create({
      data: {
        name: `Book ${i}`,
        description: `Description for book ${i}`,
        stock: Math.floor(Math.random() * 20) + 1,
        imageurl: `dummy_books.png`,
        userId: users[Math.floor(Math.random() * users.length)].id,
        status: 'ACCEPTED',
      },
    });
    books.push(book);

    // Add random categories to each book
    await prisma.bookCategories.create({
      data: {
        bookId: book.id,
        categoryId: categories[Math.floor(Math.random() * categories.length)].id,
      },
    });
  }

  // Create Peminjaman (Borrowing)
  for (let i = 1; i <= 10; i++) {
    const startDate = new Date();
    const deadlineDate = new Date();
    deadlineDate.setDate(deadlineDate.getDate() + 14);

    await prisma.peminjaman.create({
      data: {
        bookId: books[Math.floor(Math.random() * books.length)].id,
        userId: users[Math.floor(Math.random() * users.length)].id,
        status: 'PENDING',
        deadlineDate,
        plannedPickUpDate: startDate,
      },
    });
  }

  // Create News
  for (let i = 1; i <= 10; i++) {
    await prisma.news.create({
      data: {
        title: `News Title ${i}`,
        subTitle: `Subtitle for news ${i}`,
        author: `Author ${i}`,
        imageUrl: `https://dhrqldvp-3000.asse.devtunnels.ms/uploads/dummy_news.jpg`,
        content: `Detailed content for news article ${i}. Lorem ipsum dolor sit amet.`,
      },
    });
  }

  // Create Questions
  for (let i = 1; i <= 10; i++) {
    await prisma.question.create({
      data: {
        question: `Question ${i}?`,
        answer: i % 2 === 0 ? `Answer to question ${i}` : null,
        isAnswer: i % 2 === 0,
      },
    });
  }

  // Create Kegiatan (Activities)
  for (let i = 1; i <= 10; i++) {
    await prisma.kegiatan.create({
      data: {
        title: `Activity ${i}`,
        userId: users[Math.floor(Math.random() * users.length)].id,
        score: Math.floor(Math.random() * 100),
        file1: `https://dhrqldvp-3000.asse.devtunnels.ms/uploads/dummy_news.jpg`,
        file2: i % 2 === 0 ? `https://dhrqldvp-3000.asse.devtunnels.ms/uploads/dummy_news.jpg` : null,
        file3: i % 3 === 0 ? `https://dhrqldvp-3000.asse.devtunnels.ms/uploads/dummy_news.jpg` : null,
      },
    });
  }

  // Create Office Addresses
  for (let i = 1; i <= 10; i++) {
    await prisma.officeAddress.create({
      data: {
        name: `Office ${i}`,
        address: `Street Address ${i}, City ${i}, Country`,
      },
    });
  }

  // Create Allocation Types
  for (let i = 1; i <= 10; i++) {
    await prisma.allocationType.create({
      data: {
        name: `Allocation Type ${i}`,
        code: `AT${i}`,
        isActive: true,
      },
    });
  }

  // Create Infaq
  for (let i = 1; i <= 10; i++) {
    await prisma.infaq.create({
      data: {
        userId: users[Math.floor(Math.random() * users.length)].id,
        amount: Math.floor(Math.random() * 1000000),
        orderId: `ORDER${i}`,
        allocationTypeCode: `AT${Math.floor(Math.random() * 10) + 1}`,
        paymentType: ['bank_transfer', 'credit_card', 'e-wallet'][Math.floor(Math.random() * 3)],
      },
    });
  }

  // Create some likes and dislikes
  for (let i = 0; i < 10; i++) {
    await prisma.postLike.create({
      data: {
        userId: users[Math.floor(Math.random() * users.length)].id,
        postId: posts[Math.floor(Math.random() * posts.length)].id,
      },
    });

    await prisma.postDislike.create({
      data: {
        userId: users[Math.floor(Math.random() * users.length)].id,
        postId: posts[Math.floor(Math.random() * posts.length)].id,
      },
    });

    await prisma.commentLike.create({
      data: {
        userId: users[Math.floor(Math.random() * users.length)].id,
        commentId: comments[Math.floor(Math.random() * comments.length)].id,
      },
    });
  }

  // Create Notifications
  for (let i = 1; i <= 10; i++) {
    await prisma.notification.create({
      data: {
        title: `Notification ${i}`,
        body: `Body of notification ${i}`,
        data: { type: 'notification', id: i },
        userId: users[Math.floor(Math.random() * users.length)].id,
        imageUrl: i % 2 === 0 ? `https://example.com/notifications/image${i}.jpg` : null,
      },
    });
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });