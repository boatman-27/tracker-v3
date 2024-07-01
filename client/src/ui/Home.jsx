import { useQuery } from "@tanstack/react-query";
import JobsTable from "../features/Jobs/JobsTable";
import { getJobs } from "../services/apiJobs";
import TodoTable from "../features/todo/TodoTable";
import { getTodos } from "../services/apiTodo";

function Home() {
  const { data: appliedJobs } = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
  });

  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
  return (
    <div className="flex flex-col gap-4 p-3 max-w-screen-2xl m-auto">
      {appliedJobs?.length > 0 ? (
        <>
          <h1 className="text-center p-3 font-semibold text-3xl text-yellow-400">
            Latest Jobs I applied to
          </h1>
          <JobsTable appliedJobs={appliedJobs} />
        </>
      ) : (
        <h1 className="text-center p-3 font-semibold text-3xl text-yellow-400">
          Start Applying 🫠
        </h1>
      )}
      {todos?.length > 0 ? (
        <>
          <h1 className="text-center p-3 font-semibold text-3xl text-yellow-400">
            Latest Tasks I have to do
          </h1>
          <TodoTable todos={todos} />
        </>
      ) : (
        <h1 className="text-center p-3 font-semibold text-3xl text-yellow-400">
          You have nothing to do 🥳
        </h1>
      )}
    </div>
  );
}

export default Home;
