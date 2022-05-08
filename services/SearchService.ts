import { Configuration, OpenAIApi } from "openai";

interface ISearchService {
  query: (
    query: string
  ) => Promise<Record<string, Array<Record<string, string | number>>>>;
}

class MockSearchService implements ISearchService {
  async query(query: string) {
    const mockReturnData = {
      orders: [
        {
          customer_id: "1",
          period: "2018-01-01",
          orders: 2,
        },
        {
          customer_id: "2",
          period: "2018-01-01",
          orders: 1,
        },
        {
          customer_id: "3",
          period: "2018-01-01",
          orders: 3,
        },
        {
          customer_id: "6",
          period: "2018-01-01",
          orders: 1,
        },
      ],
    };

    return Promise.resolve(mockReturnData);
  }
}

class SearchService implements ISearchService {
  private url: string;
  private openai: OpenAIApi;
  constructor() {
    if (!process.env.METRICS_API_URL) {
      throw new Error("No metrics API url provided");
    }
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("No OpenAI API key provided");
    }
    this.url = process.env.METRICS_API_URL;
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  private getGraphQLQuery(query: string): string {
    // TODO: implement this
    return '{orders(grain: "year") {customer_id\nperiod\norders}}';
  }

  async query(query: string) {
    const graphQLQuery = this.getGraphQLQuery(query);
    const res = await fetch(this.url, {
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        query: graphQLQuery,
      }),
    });
    const { data } = await res.json();

    return data;
  }
}

const instance = process.env.METRICS_API_URL
  ? new SearchService()
  : new MockSearchService();
export default instance;
