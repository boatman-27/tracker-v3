import { useQueryClient, useMutation } from "@tanstack/react-query";

import { updateStatus } from "../../services/apiJobs";

export function useChangeStatus() {
  const queryClient = useQueryClient();
  const { mutate: changeStatus } = useMutation({
    mutationFn: ({ id, status }) => updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return changeStatus;
}
