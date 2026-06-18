import { prisma } from "./lib/prisma";

async function main() {
      // Create a new user with a post
      const user = await prisma.user.create({
            data: {
                  name: "Abu solayman Sefat",
                  email: "abusolaymansefat@prisma.io",
                  posts: {
                        create: {
                              title: "my crerated post with prisma and typescript",
                              content: "this is my abu solayman sefat second post with prisma and typescript",
                              published: true,
                        }
                  }
            },
            include: {
                  posts: true,
            }
      })
      console.log("Created user:", user);

      // Fetch all users with their posts
      const allUsers = await prisma.user.findMany({
            include: {
                  posts: true,
            },
      });
      console.log("All users:", JSON.stringify(allUsers, null, 2));
}

main()
      .then(async () => {
            await prisma.$disconnect();
      })
      .catch(async (e) => {
            console.error(e);
            await prisma.$disconnect();
            process.exit(1);
      });