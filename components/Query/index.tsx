import router from "next/router";
import { useCallback, useState } from "react";
import QuestionResults from "../../components/QuestionResults";
import QuestionSearch from "../../components/QuestionSearch";
import styles from "../../styles/Home.module.css";

enum Tabs {
  RESULTS,
  QUERY,
}

const Query = ({ query }: { query?: string }) => {
  const [data, setData] = useState<
    Record<string, Array<Record<string, string | number>>> | undefined
  >();
  const [errors, setErrors] = useState<Array<any> | undefined>();
  const [graphQLQuery, setGraphQLQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.RESULTS);

  const runQuery = useCallback(
    async (query: string) => {
      setLoading(true);
      setErrors(undefined);
      setGraphQLQuery("");
      const res = await fetch("/api/search", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const { graphQLQuery, data, errors } = await res.json();
      errors ? setErrors(errors) : setData(data);
      setGraphQLQuery(graphQLQuery);
      setLoading(false);
    },
    [setData, setErrors, setGraphQLQuery, setLoading]
  );

  return (
    <>
      <div className={styles.queryNavBar}>
        <ul>
          <li
            className={
              activeTab === Tabs.RESULTS
                ? styles.queryNavBarActiveTab
                : undefined
            }
            onClick={() => setActiveTab(Tabs.RESULTS)}
          >
            Results
          </li>
          <li
            className={
              activeTab === Tabs.QUERY ? styles.queryNavBarActiveTab : undefined
            }
            onClick={() => setActiveTab(Tabs.QUERY)}
          >
            Query
          </li>
        </ul>
      </div>
      <div className={styles.queryContainer}>
        <QuestionSearch
          cardStyle={styles.card}
          initialQuery={query}
          runQuery={runQuery}
        />
        <div className={styles.resultsContainer}>
          {graphQLQuery && (
            <div className={styles.code}>
              <text>{graphQLQuery}</text>
            </div>
          )}
          {errors ? (
            <text>{`Error: ${JSON.stringify(errors)}`}</text>
          ) : (
            <QuestionResults data={data} loading={loading} />
          )}
        </div>
      </div>
    </>
  );
};

export default Query;
