import type { GetServerSideProps } from "next";
import Header from "../../components/Header";
import Query from "../../components/Query";

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
      query: Buffer.from(encodedQuery as string, "base64").toString(),
    },
  };
};
