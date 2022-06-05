import { useEffect, useState } from "react";

function useMetricsCatalog() {
  const [schema, setSchema] = useState<string | undefined>();

  useEffect(() => {
    fetch("/api/schema").then((response) =>
      response.json().then(({ graphQLSchema }) => setSchema(graphQLSchema))
    );
  }, []);
  return schema;
}

export default useMetricsCatalog;
