import { useQueryClient, useMutation } from "@tanstack/react-query";
import { delayTask } from "../../services/apiTodo";

export function useDelayTask() {
  const queryClient = useQueryClient();
  const { mutate: delayTaskTime } = useMutation({
    mutationFn: ({ id, delay }) => delayTask(id, delay),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return delayTaskTime;
}
