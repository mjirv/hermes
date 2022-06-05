import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Metrics from "../components/Metrics";
import QuestionSearch from "../components/QuestionSearch";
import useMetricsCatalog from "../hooks/useMetricsCatalog";
import styles from "../styles/Home.module.css";

const Header = () => (
  <div>
    <h1 className={styles.title}>Hermes</h1>
  </div>
);

const Description = () => (
  <p className={styles.description}>Get started by asking a question below!</p>
);

const Home: NextPage = () => {
  const [showMetrics] = useState(false);
  useMetricsCatalog(); // just run for now to make sure the API is running; later we can use this to display the metrics catalog on the index page

  return (
    <div className={styles.container}>
      <Head>
        <title>Hermes</title>
        <link rel="icon" href="/hermes_favicon.png" />
      </Head>

      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.indexContent}>
            <Header />
            <Description />
            <QuestionSearch cardStyle={styles.card} />
          </div>
        </div>
        {showMetrics && <Metrics />}
      </main>
      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  );
};

export default Home;
