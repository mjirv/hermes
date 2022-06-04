import type { GetServerSideProps } from "next";
import Link from "next/link";
import Query from "../../components/Query";
import styles from "../../styles/Home.module.css";

const Header = () => (
  <div className={styles.header}>
    <h1 className={styles.title}>
      <Link href="/">Hermes</Link>
    </h1>
    <ul className={styles.headerLinks}>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <a
          href="https://github.com/mjirv/Hermes"
          target={"_blank"}
          rel="noreferrer"
        >
          Docs
        </a>
      </li>
      <li>
        <Link href="/admin">Admin</Link>
      </li>
    </ul>
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
