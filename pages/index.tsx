import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import QuestionResults from "../components/QuestionResults";
import QuestionSearch from "../components/QuestionSearch";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [data, setData] = useState<
    Record<string, Array<Record<string, string | number>>> | undefined
  >();
  const [schema, setSchema] = useState<string | undefined>();
  const [errors, setErrors] = useState<Array<any> | undefined>();
  const [graphQLQuery, setGraphQLQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!schema) {
      fetch("/api/schema").then((response) =>
        response.json().then(({ graphQLSchema }) => setSchema(graphQLSchema))
      );
    }
  }, [schema]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Hermes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.title}>Hermes</h1>

          <p className={styles.description}>
            Get started by asking a question below!
          </p>

          <QuestionSearch
            cardStyle={styles.card}
            setData={setData}
            setErrors={setErrors}
            setGraphQLQuery={setGraphQLQuery}
            setLoading={setLoading}
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
        <div className={styles.sidebar}>
          <text className={styles.description}>{"Metrics Catalog"}</text>
          <div className={styles.code}>
            {schema
              ? schema
                  .replaceAll(/(type Query|enum Grain) \{[\s\S]*?\}\n\n/g, "")
                  .trim()
              : "loading..."}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        {/* <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a> */}
      </footer>
    </div>
  );
};

export default Home;
