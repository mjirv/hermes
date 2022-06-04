import type { NextPage } from "next";
import Header from "../components/Header";
import Metrics from "../components/Metrics";

const MetricsPage: NextPage = () => {
  return (
    <>
      <Header />
      <Metrics />
    </>
  );
};

export default MetricsPage;
