import DataTable from "react-data-table-component";

const QuestionResults = ({
  data,
  loading = false,
}: {
  data: Record<string, Array<Record<string, string | number>>> | undefined;
  loading?: boolean;
}) => {
  if (loading) {
    return <DataTable data={[]} columns={[]} progressPending={true} />;
  }
  if (!data) return null;

  const dataToDisplay = data[Object.keys(data)[0]];
  console.info(JSON.stringify(dataToDisplay));
  const columns = Object.keys(dataToDisplay[0]).map((key) => ({
    name: key,
    selector: (row: Record<string, string | number>) => row[key],
    sortable: true,
  }));
  return (
    <DataTable
      columns={columns}
      data={dataToDisplay}
      pagination={true}
      paginationPerPage={20}
      progressPending={loading}
    />
  );
};

export default QuestionResults;
