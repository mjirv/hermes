import { Dispatch, SetStateAction, useCallback, useState } from "react";
import styles from "./QuestionSearch.module.css";

const QuestionSearch = ({
  cardStyle,
  setData,
  setGraphQLQuery,
  setLoading,
}: {
  cardStyle: string;
  setData: Dispatch<
    SetStateAction<
      Record<string, Array<Record<string, string | number>>> | undefined
    >
  >;
  setGraphQLQuery: Dispatch<SetStateAction<string>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const [query, setQuery] = useState("");
  const handleSubmit = useCallback(async () => {
    setLoading(true);
    setGraphQLQuery("");
    const res = await fetch("/api/search", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    const { graphQLQuery, data } = await res.json();
    setData(data);
    setGraphQLQuery(graphQLQuery);
    setLoading(false);
  }, [query, setData, setGraphQLQuery, setLoading]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
      }}
      className={styles.searchContainer}
    >
      <input
        type="text"
        className={cardStyle}
        placeholder={"How many orders were placed in Q4 2021?"}
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      <button type="submit" className={cardStyle}>
        Submit
      </button>
    </form>
  );
};

export default QuestionSearch;
