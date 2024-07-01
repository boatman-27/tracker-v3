import JobItem from "./JobItem";

function JobsTable({ appliedJobs }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-2">
              Job Title
            </th>
            <th scope="col" className="px-4 py-2">
              Company Name
            </th>
            <th scope="col" className="px-4 py-2">
              Company Location
            </th>
            <th scope="col" className="px-4 py-2">
              Status
            </th>
            <th scope="col" className="px-4 py-2">
              Applied On
            </th>
            <th scope="col" className="px-4 py-2 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {appliedJobs?.map((job) => (
            <JobItem job={job} key={job.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JobsTable;
