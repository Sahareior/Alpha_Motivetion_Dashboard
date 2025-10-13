import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
  import { Provider } from 'react-redux'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import DashHome from './screens/Dashboardhome/DashHome';
import { UserManagement } from "./screens/UserManagement/UserManagement";
import Overview from "./screens/Overview/Overview";
import { PricingPlans } from "./screens/PricingPlans/PricingPlan";
import { PushNotifications } from "./screens/PushNotifications/PushNotifications";
import AlphaSettings from './screens/settings/AlphaSettings';
import Login from "./screens/auth/Login";
import {store} from '../store/store.js'




const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <DashHome /> },
      { path: "user-management", element: <UserManagement /> },
      { path: "overview", element: <Overview /> },
      { path: "notification", element: <PushNotifications /> },
      { path: "settings", element: <AlphaSettings /> },
      { path: "plans", element: <PricingPlans /> },
    ],
  },
]);

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
