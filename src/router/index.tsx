import { lazy } from "react";
import { createBrowserRouter, type RouteObject } from "react-router";

const BaseLayout = lazy(() => import("@/layout/BaseLayout"));
const Home = lazy(() => import("@/views/Home"));
const ArticleList = lazy(() => import("@/views/ArticleList"));
const ArticleDetail = lazy(() => import("@/views/ArticleDetail"));
const Messages = lazy(() => import("@/views/Messages"));
const Dashboard = lazy(() => import("@/views/Dashboard"));
const About = lazy(() => import("@/views/About"));
const Settings = lazy(() => import("@/views/Settings"));
const NotFound = lazy(() => import("@/components/NotFound"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "",
        element: <Home />,
        index: true,
      },
      {
        path: "articles",
        element: <ArticleList />,
      },
      {
        path: "articles/:id",
        element: <ArticleDetail />,
      },
      {
        path: "messages",
        element: <Messages />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default createBrowserRouter(routes, { basename: "/" });
