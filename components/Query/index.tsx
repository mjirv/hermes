import { useCallback, useState } from "react";
import QuestionResults from "../../components/QuestionResults";
import QuestionSearch from "../../components/QuestionSearch";
import styles from "../../styles/Home.module.css";

const Query = () => {
  const [data, setData] = useState<
    Record<string, Array<Record<string, string | number>>> | undefined
  >();
  const [errors, setErrors] = useState<Array<any> | undefined>();
  const [graphQLQuery, setGraphQLQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
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
      <QuestionSearch cardStyle={styles.card} handleSubmit={handleSubmit} />
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
    </>
  );
};

export default Query;
