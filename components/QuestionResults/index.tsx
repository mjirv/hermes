import DataTable from "react-data-table-component";

const QuestionResults = ({
  data,
}: {
  data: Record<string, Array<Record<string, string | number>>> | undefined;
}) => {
  if (!data) return null;
  const dataToDisplay = data["orders"];
  console.info(JSON.stringify(dataToDisplay));
  const columns = Object.keys(dataToDisplay[0]).map((key) => ({
    name: key,
    selector: (row: Record<string, string | number>) => row[key],
    sortable: true,
  }));
  return <DataTable columns={columns} data={dataToDisplay} />;
};

export default QuestionResults;
