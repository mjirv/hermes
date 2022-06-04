import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";

const Metrics = () => {
  const [schema, setSchema] = useState<string | undefined>();
  useEffect(() => {
    if (!schema) {
      fetch("/api/schema").then((response) =>
        response.json().then(({ graphQLSchema }) => setSchema(graphQLSchema))
      );
    }
  }, [schema]);

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <text className={styles.description}>{"Metrics Catalog"}</text>
        <div className={styles.code}>
          {schema
            ? schema
                .replaceAll(/(type Query|enum Grain) \{[\s\S]*?\}\n\n/g, "")
                .trim()
            : "loading..."}
        </div>
      </div>
    </div>
  );
};

export default Metrics;
