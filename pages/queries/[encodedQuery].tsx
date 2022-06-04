import type { GetServerSideProps } from "next";
import Query from "../../components/Query";
import styles from "../../styles/Home.module.css";

const Header = () => (
  <div className={styles.header}>
    <h1 className={styles.title}>Hermes</h1>
  </div>
);

const QueryPage = ({ query }: { query: string }) => {
  return (
    <>
      <Header />
      <Query query={query} />
    </>
  );
};

export default QueryPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { encodedQuery } = context.query;
  return {
    props: {
      query: Buffer.from(encodedQuery as string, "base64url").toString(),
    },
  };
};
