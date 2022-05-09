import metricService, { MetricService } from "./MetricService";
import nlpService, { NLPService } from "./NLPService";

interface ISearchService {
  query: (query: string) => Promise<{
    graphQLQuery: string;
    data: Record<string, Array<Record<string, string | number>>>;
  }>;
}

class SearchService implements ISearchService {
  private metricService: MetricService;
  private nlpService: NLPService;
  constructor({
    metricService,
    nlpService,
  }: {
    metricService: MetricService;
    nlpService: NLPService;
  }) {
    this.metricService = metricService;
    this.nlpService = nlpService;
  }

  async query(query: string) {
    if (!query) {
      throw new Error("Query must be provided");
    }
    console.debug(`Starting query`, { query });
    const graphQLSchema = await this.metricService.getGraphQLSchema();
    const graphQLQuery = await this.nlpService.getGraphQLQueryFromText({
      query,
      graphQLSchema,
    });
    const data = await metricService.query(graphQLQuery);
    console.debug(`Query finished`, { query });
    return { graphQLQuery, data };
  }
}

const instance = new SearchService({ metricService, nlpService });
export default instance;
