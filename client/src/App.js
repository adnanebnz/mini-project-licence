import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Randos from "./pages/Randos";
import Shop from "./pages/Shop";
import Single from "./pages/Single";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Contact from "./pages/Contact";
import { About } from "./pages/About";
import Product from "./pages/Product";
import ScrollToTop from "./Components/ScrollToTop";

const Layout = () => {
  return (
    <div className="m-4">
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/rando/:id",
        element: <Single />,
      },
      {
        path: "/randos",
        element: <Randos />,
      },
      {
        path: "/boutique",
        element: <Shop />,
      },
      {
        path: "/boutique/:id",
        element: <Product />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <div style={{ width: "100%" }}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
