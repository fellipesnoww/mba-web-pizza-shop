import { createBrowserRouter } from "react-router";

import { Dashboard } from "./app/dashboard";
import { SignIn } from "./auth/sign-in";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  }
]);
