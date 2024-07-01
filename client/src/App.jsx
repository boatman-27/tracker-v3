import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./ui/Home";
import Error from "./ui/Error";
import AppLayout from "./ui/AppLayout";
import Jobs from "./features/Jobs/Jobs";
import SinglePageJob from "./features/Jobs/SinglePageJob";
import Todo from "./features/todo/Todo";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/jobs", element: <Jobs />, errorElement: <Error /> },
      {
        path: "jobs/:id",
        element: <SinglePageJob />,
        errorElement: <Error />,
      },

      { path: "/todo", element: <Todo />, errorElement: <Error /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
