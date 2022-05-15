import { Dispatch, SetStateAction, useCallback, useState } from "react";
import styles from "./QuestionSearch.module.css";

const QuestionSearch = ({
  cardStyle,
  setData,
  setErrors,
  setGraphQLQuery,
  setLoading,
}: {
  cardStyle: string;
  setData: Dispatch<
    SetStateAction<
      Record<string, Array<Record<string, string | number>>> | undefined
    >
  >;
  setErrors: Dispatch<SetStateAction<any>>;
  setGraphQLQuery: Dispatch<SetStateAction<string>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const [query, setQuery] = useState("");
  const handleSubmit = useCallback(async () => {
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
  }, [query, setData, setErrors, setGraphQLQuery, setLoading]);
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
        placeholder={"How much $$$ did we make in 2018?"}
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      <button type="submit" className={cardStyle}>
        Submit
      </button>
    </form>
  );
};

export default QuestionSearch;
