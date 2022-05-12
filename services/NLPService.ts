export interface NLPService {
  getGraphQLQueryFromText({
    query,
    graphQLSchema,
  }: {
    query: string;
    graphQLSchema?: string;
  }): Promise<string>;
}

class MockNLPService implements NLPService {
  async getGraphQLQueryFromText({ query }: { query: string }): Promise<string> {
    return Promise.resolve(
      '{orders(grain: "year") {customer_id\nperiod\norders}}'
    );
  }
}

class HermesApiService implements NLPService {
  private url: string;
  private clientId: string;
  private apiKey: string;
  constructor(
    url: string | undefined,
    clientId: string | undefined,
    apiKey: string | undefined
  ) {
    if (!url || !clientId || !apiKey) {
      throw new Error("must provide HERMES_API_URL and HERMES_API_KEY");
    }
    this.url = url;
    this.clientId = clientId;
    this.apiKey = apiKey;
  }
  async getGraphQLQueryFromText({
    query,
    graphQLSchema,
  }: {
    query: string;
    graphQLSchema?: string | undefined;
  }): Promise<string> {
    console.debug(`Getting graphQL query`);
    const res = await fetch(this.url, {
      method: "POST",
      headers: {
        "X-CLIENT-ID": this.clientId,
        "X-API-KEY": this.apiKey,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ query, graphQLSchema }),
    });
    const { graphQLQuery } = await res.json();
    console.debug(`GraphQL query finished`, { graphQLQuery });
    return graphQLQuery;
  }
}

const instance = process.env.HERMES_API_KEY
  ? new HermesApiService(
      process.env.HERMES_API_URL,
      process.env.HERMES_API_CLIENT_ID,
      process.env.HERMES_API_KEY
    )
  : new MockNLPService();
export default instance;
