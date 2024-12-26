import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import Details from "./components/Details/Details";
import { ROUTES } from "./routes/routes";
import Resources from "./components/Resources/Resources";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Auth from "./components/Auth/Auth";
import ProtectedRoute from "./pages/landing/ProtectedRoute";
import PageNotFound from "./pages/notfound/PageNotFound";

export const routes = [
  {
    path: ROUTES.LANDING,
    element: <App />,
    children: [
      {
        path: ROUTES.LANDING,
        element: <Auth />,
        children: [
          {
            path: ROUTES.LOGIN,
            element: <Login />,
          },
          {
            path: ROUTES.SIGNUP,
            element: <Signup />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.RESOURCES,
            element: <Resources />,
          },
          {
            path: `${ROUTES.DETAILS}/:id`,
            element: <Details />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 1000 * 60 * 15,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
