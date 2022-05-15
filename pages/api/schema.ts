import type { NextApiRequest, NextApiResponse } from "next";
import metricService from "../../services/MetricService";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<{ graphQLSchema: string }>
) {
  const graphQLSchema = await metricService.getGraphQLSchema();
  res.status(200).json({ graphQLSchema });
}
