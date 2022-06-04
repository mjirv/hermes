import { useEffect, useState } from "react";
import setQueryPath from "../../utils/setQueryPath";
import styles from "./QuestionSearch.module.css";

const QuestionSearch = ({
  cardStyle,
  runQuery,
  initialQuery,
}: {
  cardStyle: string;
  runQuery?: (query: string) => void;
  initialQuery?: string;
}) => {
  useEffect(() => {
    initialQuery && runQuery && runQuery(initialQuery);
  }, [initialQuery, runQuery]);
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setQueryPath(query);
      }}
      className={styles.searchContainer}
    >
      <input
        type="text"
        className={cardStyle}
        placeholder={"How much $$$ did we make in 2018?"}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <button type="submit" className={cardStyle}>
        Submit
      </button>
    </form>
  );
};

export default QuestionSearch;
