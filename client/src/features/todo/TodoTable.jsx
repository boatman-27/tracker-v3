import TodoItem from "./TodoItem";

function TodoTable({ todos }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-2">
              Task
            </th>
            <th scope="col" className="px-4 py-2">
              Task Content
            </th>
            <th scope="col" className="px-4 py-2">
              Time Frame
            </th>
            <th scope="col" className="px-4 py-2">
              Status
            </th>
            <th scope="col" className="px-4 py-2">
              Date Added
            </th>
            <th scope="col" className="px-4 py-2 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {todos?.map((task) => (
            <TodoItem key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TodoTable;