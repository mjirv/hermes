interface ISearchService {
  query: (
    query: string
  ) => Record<string, Array<Record<string, string | number>>>;
}

class MockSearchService implements ISearchService {
  query(query: string) {
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

    return mockReturnData;
  }
}

const instance = new MockSearchService();
export default instance;
