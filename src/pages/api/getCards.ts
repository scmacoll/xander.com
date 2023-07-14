//src/pages/api/getCards.ts
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get('http://localhost:5001/api/getCards');
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cards' });
  }
}
