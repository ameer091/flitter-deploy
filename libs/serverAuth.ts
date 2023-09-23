import {NextApiRequest, NextApiResponse} from "next";
// import {getSession} from 'next-auth/react';
import prisma from "@/libs/prismadb";
import {getServerSession} from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

// const serverAuth = async (req: NextApiRequest) => {
//   console.log("=== serverAuth Invoked ===")
//   console.log("Request headers:", req.headers)
//   const session = await getSession({req});

//   console.log('Session', session)

//   if (!session?.user?.email) {
//     console.log('User not authenticated')
//     throw new Error('Not signed in');
//   }
//   const currentUser = await prisma.user.findUnique({
//     where: {
//       email: session.user.email
//     }
//   });
//   if (!currentUser) {
//     throw new Error('Not signed in');
//   }
//   console.log('Authenticated user:', currentUser)
//   return {currentUser};
// };

// export default serverAuth;

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    throw new Error('Not signed in');
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    }
  });

  if (!currentUser) {
    throw new Error('Not signed in');
  }

  return { currentUser };
};

export default serverAuth;



