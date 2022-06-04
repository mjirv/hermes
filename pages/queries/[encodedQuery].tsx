import type { GetServerSideProps } from "next";

const QueryPage = ({ query }: { query: string }) => {
  return <>{query}</>;
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
