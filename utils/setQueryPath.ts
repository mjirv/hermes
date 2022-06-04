import router from "next/router";

const encodeQuery = (query: string) =>
  encodeURIComponent(Buffer.from(query).toString("base64"));

const setQueryPath = (query: string) => {
  router.push(`/queries/${encodeQuery(query)}`);
};

export default setQueryPath;
