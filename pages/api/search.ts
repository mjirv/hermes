import type { NextApiRequest, NextApiResponse } from "next";
import searchService from "../../services/SearchService";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    data: Record<string, Array<Record<string, string | number>>>;
  }>
) {
  const { query } = req.body;
  const data = searchService.query(query);
  res.status(200).json({ data });
}
