import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/authContext";
import PrivateRoute from "./routes/PrivateRoute";
import RedirectRoute from "./routes/RedirectRoute";
import PublicRoute from "./routes/PublicRoute";
import { ToastContainer } from "react-toastify";
import OrdersPage from "./pages/dashboard/OrdersPage";
import CustomersPage from "./pages/dashboard/CustomersPage";

// products
import Products, { productsLoader } from "./pages/dashboard/Products/Products";
import Product, { productLoader } from "./pages/dashboard/Products/Product";
import AddProduct, {
  addProductLoader,
} from "./pages/dashboard/Products/AddProduct";

// pages
import Pages, { pagesLoader } from "./pages/dashboard/Pages/Pages";
import Page, { pageLoader } from "./pages/dashboard/Pages/Page";
import AddPage from "./pages/dashboard/Pages/AddPage";

// categories
import Categories, {
  categoriesLoader,
} from "./pages/dashboard/Categories/Categories";
import Category, {
  categoryLoader,
} from "./pages/dashboard/Categories/Category";
import AddCategory from "./pages/dashboard/Categories/AddCategory";

// attributes
import Attributes, {
  attributesLoader,
} from "./pages/dashboard/Attributes/Attributes";
import Attribute, {
  attributeLoader,
} from "./pages/dashboard/Attributes/Attribute";
import AddAttribute from "./pages/dashboard/Attributes/AddAttribute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RedirectRoute />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "customers", element: <CustomersPage /> },

      // products
      { path: "products", element: <Products />, loader: productsLoader },
      {
        path: "products/add",
        element: <AddProduct />,
        loader: addProductLoader,
      },
      { path: "products/:uuid", element: <Product />, loader: productLoader },

      // pages
      { path: "pages", element: <Pages />, loader: pagesLoader },
      { path: "pages/add", element: <AddPage /> },
      { path: "pages/:uuid", element: <Page />, loader: pageLoader },

      // categories
      { path: "categories", element: <Categories />, loader: categoriesLoader },
      { path: "categories/add", element: <AddCategory /> },
      {
        path: "categories/:uuid",
        element: <Category />,
        loader: categoryLoader,
      },

      // attributes
      { path: "attributes", element: <Attributes />, loader: attributesLoader },
      { path: "attributes/add", element: <AddAttribute /> },
      {
        path: "attributes/:uuid",
        element: <Attribute />,
        loader: attributeLoader,
      },
    ],
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  );
};

export default App;
