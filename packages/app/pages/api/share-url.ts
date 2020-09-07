import { NextApiRequest, NextApiResponse } from 'next';
import { verifyIdToken } from 'lib/firebaseAdmin';

const handler = async (req: NextApiRequest & { headers?: { token: string } }, res: NextApiResponse<string>) => {
  // @TODO: forward the post data to callable firebase function
  const token = req.headers.token;
  try {
    await verifyIdToken(token);
    return res.status(200).send('authorized');
  } catch (error) {
    return res.status(401).send('You are unauthorised');
  }
};

export default handler;
