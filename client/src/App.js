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
import CartMenu from "./Components/CartMenu";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Error from "./pages/Error";
import Cancel from "./pages/Cancel";
import Profile from "./pages/Profile";
import ProcessCheckout from "./pages/ProcessCheckout";
import UserDashboard from "./pages/userDashboard/UserDashboard";
import SendEmail from "./pages/SendEmail";
import ResetPassword from "./pages/ResetPassword";
import AdminDashBoard from "./pages/admin/AdminDashBoard";
const Layout = () => {
  return (
    <div className="m-4">
      <ScrollToTop />
      <Header />
      <Outlet />
      <CartMenu />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/randos/:id",
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
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/profile/dashboard/:id",
        element: <UserDashboard />,
      },
      {
        path: "/admin/dashboard/:id",
        element: <AdminDashBoard />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/reset-password",
    element: <SendEmail />,
  },
  {
    path: "/reset-password/:id/:token",
    element: <ResetPassword />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/checkout/process",
    element: <ProcessCheckout />,
  },
  {
    path: "/checkout/success",
    element: <Success />,
  },
  {
    path: "/checkout/cancel",
    element: <Cancel />,
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
