import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/PostIdPage";
import Login from "../pages/Login";
import Error from "../pages/Error";

export const privateRoutes = [
  { path: '/about', element: <About />, exact: true },
  { path: '/posts', element: <Posts />, exact: true },
  { path: '/posts/:id', element: <PostIdPage />, exact: true },
  { path: '/posts/:id', element: <PostIdPage />, exact: true },
  { path: '/404', element: <Error />, exact: true },
]

export const publicRoutes = [
  { id: 0, path: '/login', element: <Login />, exact: true },
  { id: 1, path: '/about', element: <About />, exact: true },
]