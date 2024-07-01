import { useQueryClient, useMutation } from "@tanstack/react-query";

import { completeTask } from "../../services/apiTodo";

export function useMarkComplete() {
  const queryClient = useQueryClient();
  const { mutate: markComplete } = useMutation({
    mutationFn: (id) => completeTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
  return markComplete;
}
