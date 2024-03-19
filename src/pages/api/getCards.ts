//src/pages/api/getCards.ts
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL; // Use the environment variable
  try {
    // const response = await axios.get('http://localhost:5001/api/getCards');
    const response = await axios.get(`${baseUrl}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cards' });
  }
}

