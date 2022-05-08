import { Dispatch, SetStateAction, useCallback, useState } from "react";
import styles from "./QuestionSearch.module.css";

const QuestionSearch = ({
  cardStyle,
  setData,
  setLoading,
}: {
  cardStyle: string;
  setData: Dispatch<
    SetStateAction<
      Record<string, Array<Record<string, string | number>>> | undefined
    >
  >;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const [query, setQuery] = useState("");
  const handleSubmit = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify(query),
    });
    const { data } = await res.json();
    setData(data);
    setLoading(false);
  }, [query, setData, setLoading]);
  return (
    <div className={styles.searchContainer}>
      <textarea
        className={cardStyle}
        placeholder={"How many orders were placed in Q4 2021?"}
        onChange={(e) => setQuery(e.target.value)}
      ></textarea>
      <button className={cardStyle} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default QuestionSearch;
