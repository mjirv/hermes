import type { NextApiRequest, NextApiResponse } from "next";
import searchService from "../../services/SearchService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    graphQLQuery: string;
    data: Record<string, Array<Record<string, string | number>>>;
  }>
) {
  const { query } = req.body;
  const response = await searchService.query(query);
  res.status(200).json(response);
}
