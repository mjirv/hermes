const QuestionResults = ({
  data,
}: {
  data: Record<string, string> | undefined;
}) => <div>{JSON.stringify(data)}</div>;

export default QuestionResults;
