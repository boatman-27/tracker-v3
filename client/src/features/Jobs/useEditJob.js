import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editJob } from "../../services/apiJobs";

export function useEditJob() {
  const queryClient = useQueryClient();
  const { mutate: editJobMutation, isPending: isEditing } = useMutation({
    mutationFn: ({ id, job }) => editJob(id, job),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });
  return { editJobMutation, isEditing };
}
