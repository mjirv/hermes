import { useState } from "react";
import styles from "./QuestionSearch.module.css";

const QuestionSearch = ({
  cardStyle,
  handleSubmit,
}: {
  cardStyle: string;
  handleSubmit: (query: string) => void;
}) => {
  const [query, setQuery] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit(query);
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
