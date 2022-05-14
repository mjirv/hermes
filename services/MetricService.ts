import { getIntrospectionQuery, buildClientSchema, printSchema } from "graphql";

export interface MetricService {
  getGraphQLSchema(): Promise<string>;
  query(graphQLQuery: string): Promise<{
    data: Record<string, Record<string, string | number>[]>;
    errors: any | undefined;
  }>;
}

class MockMetricService implements MetricService {
  async query(graphQLQuery: string) {
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

    return Promise.resolve({ data: mockReturnData, errors: undefined });
  }

  async getGraphQLSchema(): Promise<string> {
    const mockReturnData = `type Query {
      orders(grain: String!, start_date: String, end_date: String): [orders]
      revenue(grain: String!, start_date: String, end_date: String): [revenue]
    }
    
    type orders {
      period: String
      orders: Float
      status: String
      customer_id: String
    }
    
    type revenue{
      period: String
      revenue: Float
      status: String
      customer_id: String
      store_id: String
    }`;

    return Promise.resolve(mockReturnData);
  }
}

class DemeterMetricService implements MetricService {
  private url: string;
  constructor(url: string) {
    this.url = url;
  }

  private async fetch(body: string): Promise<Response> {
    return await fetch(this.url, {
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      method: "POST",
      body,
    });
  }

  async getGraphQLSchema(): Promise<string> {
    console.debug(`Getting graphQL schema`);
    const res = await this.fetch(
      JSON.stringify({ query: getIntrospectionQuery() })
    );
    const { data } = await res.json();
    const schema = printSchema(buildClientSchema(data));
    console.debug(`Got GraphQL schema`, { schema });
    return schema;
  }

  async query(graphQLQuery: string): Promise<{
    data: Record<string, Record<string, string | number>[]>;
    errors: any | undefined;
  }> {
    console.debug(`Starting metrics query`);
    const res = await this.fetch(
      JSON.stringify({
        query: graphQLQuery,
      })
    );
    const { data, errors } = await res.json();
    if (errors) {
      console.warn(`Metrics query failed`, errors);
    }
    console.debug(`Metrics query finished`);

    return { data, errors };
  }
}

const instance = process.env.METRICS_API_URL
  ? new DemeterMetricService(process.env.METRICS_API_URL)
  : new MockMetricService();
export default instance;
