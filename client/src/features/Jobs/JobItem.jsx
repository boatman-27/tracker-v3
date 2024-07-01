import { deleteJob } from "../../services/apiJobs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import Button from "../../ui/Button";
import formatDate from "../../helpers/helpers";
import Loader from "../../ui/Loader";
import AddJobsForm from "./AddJobsForm";

import { useChangeStatus } from "./useChangeStatus";

function JobItem({ job }) {
  const [openFormId, setOpenFormId] = useState(null);
  const changeStatus = useChangeStatus();
  const {
    id,
    job_title,
    comp_location,
    job_status,
    comp_name,
    date_applied,
    link,
  } = job;

  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: (id) => {
      deleteJob(id);
    },
    mutationKey: id,
    onSuccess: () => {
      queryClient.invalidateQueries(["jobs"]);
    },
  });

  const handleDelete = (id) => {
    mutate(id);
    queryClient.invalidateQueries(["jobs"]);
  };

  const toggleForm = (id) => {
    setOpenFormId(openFormId === id ? null : id);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <tr>
        <td className="px-4 py-2 text-yellow-300">{job_title}</td>
        <td className="px-4 py-2 text-yellow-300">{comp_name}</td>
        <td className="px-4 py-2 text-yellow-300">{comp_location}</td>
        <td className="px-4 py-2 text-yellow-300">{job_status}</td>
        <td className="px-4 py-2 text-yellow-300">
          {formatDate(date_applied)}
        </td>
        <td className="flex px-4 py-2 gap-2 justify-center md:">
          <Button to={link} type="round">
            View
          </Button>
          <Button
            onClick={() => toggleForm(id)}
            type="round"
            disabled={job_status === "Accepted" || job_status === "Rejected"}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(id)} type="round">
            Delete
          </Button>
          <Button
            onClick={() => changeStatus({ id, status: "Accepted" })}
            type="accept"
            disabled={job_status === "Rejected"}
          >
            Accepted
          </Button>
          <Button
            onClick={() => changeStatus({ id, status: "Rejected" })}
            type="reject"
            disabled={job_status === "Accepted"}
          >
            Rejected
          </Button>
        </td>
      </tr>
      {openFormId === id && (
        <tr>
          <td colSpan="5" className="p-3">
            <AddJobsForm job={job} />
          </td>
        </tr>
      )}
    </>
  );
}

export default JobItem;
