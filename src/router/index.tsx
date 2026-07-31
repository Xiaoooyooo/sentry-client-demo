import { lazy } from "react";
import { createBrowserRouter, type RouteObject } from "react-router";

const BaseLayout = lazy(() => import("@/layout/BaseLayout"));
const Home = lazy(() => import("@/views/Home"));
const ArticleList = lazy(() => import("@/views/ArticleList"));
const ArticleDetail = lazy(() => import("@/views/ArticleDetail"));
const About = lazy(() => import("@/views/About"));
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
        path: "about",
        element: <About />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default createBrowserRouter(routes, { basename: "/" });
