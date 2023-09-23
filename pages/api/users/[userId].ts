import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {


  if (req.method !== 'GET') {
    return res.status(405).end();
  }
  try {
    const {userId} = req.query;
    //This is reason I used the syntax for the file using []

    if(!userId || typeof userId !== 'string') {
      // throw new Error('Invalid ID');
      return res.status(400).json({ error: 'Invalid ID' })
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!existingUser) {
      console.log('Error: User not found'); // Log error
      return res.status(404).json({ error: 'User not found' }); // Send error response
    }


    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId
        }
      }
    });

    return res.status(200).json({...existingUser, followersCount})

  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}