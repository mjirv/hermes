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
  constructor() {
    if (!process.env.METRICS_API_URL) {
      throw new Error("No metrics API url provided");
    }
    this.url = process.env.METRICS_API_URL;
  }

  async query(query: string) {
    const res = await fetch(this.url, {
      headers: {
        "Content-Type": "application/graphql",
        Accept: "application/json",
      },
      method: "POST",
      body: `query: {
      orders(grain: "year") {
        customer_id
        period
        orders
      }
    }`,
    });
    console.info(await res.text());
    const data = await res.json();

    return data;
  }
}

const instance = process.env.METRICS_API_URL
  ? new SearchService()
  : new MockSearchService();
export default instance;
