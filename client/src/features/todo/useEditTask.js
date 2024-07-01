import { useMutation, useQueryClient } from "@tanstack/react-query";

import { editTask } from "../../services/apiTodo";

export function useEditTask() {
  const queryClient = useQueryClient();
  const { mutate: modifyTask } = useMutation({
    mutationFn: ({ id, task }) => editTask(id, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });
  return modifyTask;
}
