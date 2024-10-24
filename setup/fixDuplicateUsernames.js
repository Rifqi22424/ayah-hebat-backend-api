const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function fixDuplicateUsernames() {
  try {
    const usersWithDuplicateUsernames = await prisma.$queryRaw`
      SELECT username, COUNT(*) as count
      FROM user
      GROUP BY username
      HAVING COUNT(*) > 1;
    `;

    for (const { username } of usersWithDuplicateUsernames) {
      const users = await prisma.user.findMany({
        where: { username },
        orderBy: { id: 'asc' },
      });

      for (let i = 1; i < users.length; i++) {
        const user = users[i];
        const newUsername = `${user.username}_${user.id}`;
        
        await prisma.user.update({
          where: { id: user.id },
          data: { username: newUsername },
        });

        console.log(`Updated username for user ${user.id} to ${newUsername}`);
      }
    }
  } catch (error) {
    console.error("Error fixing duplicate usernames:", error);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = { fixDuplicateUsernames };
