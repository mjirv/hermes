import type { NextApiRequest, NextApiResponse } from "next";
import searchService from "../../services/SearchService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    data: Record<string, Array<Record<string, string | number>>>;
  }>
) {
  const data = await searchService.query(req.body);
  res.status(200).json({ data });
}
