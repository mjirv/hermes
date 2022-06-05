import useMetricsCatalog from "../../hooks/useMetricsCatalog";
import styles from "../../styles/Home.module.css";

const Metrics = () => {
  const schema = useMetricsCatalog();

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
