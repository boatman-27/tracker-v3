import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { getJobs } from "../../services/apiJobs";

import Button from "../../ui/Button";
import Loader from "../../ui/Loader";
import Error from "../../ui/Error";
import AddJobsForm from "./AddJobsForm";
import JobsTable from "./JobsTable";

function Jobs() {
  const [isOpen, setIsOpen] = useState(true);
  const {
    isLoading,
    error,
    data: appliedJobs,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
  });

  if (isLoading) return <Loader />;
  if (error) return <Error message={error.message} />;
  if (appliedJobs.length === 0)
    return (
      <div className="flex flex-col gap-4 p-3 px-4 max-w-screen-2xl mx-auto">
        <h1 className="text-center p-3 font-semibold text-3xl text-yellow-400">
          Start Applying 🫠
        </h1>
        <Button
          type="primary"
          className="my-5"
          onClick={() => setIsOpen(!isOpen)}
        >
          Add Job
        </Button>
        {isOpen && <AddJobsForm />}
      </div>
    );
  return (
    <div className="flex flex-col gap-4 p-3 px-4 max-w-screen-2xl mx-auto">
      <h1 className="text-center p-3 font-semibold text-3xl text-yellow-400">
        Jobs I applied to
      </h1>
      <JobsTable appliedJobs={appliedJobs} />
      <Button
        type="primary"
        className="my-5"
        onClick={() => setIsOpen(!isOpen)}
      >
        Add Job
      </Button>
      {!isOpen && <AddJobsForm />}
    </div>
  );
}

export default Jobs;
