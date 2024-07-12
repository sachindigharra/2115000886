import React from "react";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Home from "./views/Home";
import CategoryList from "./components/CategoryList";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import ErrorPage from "./views/ErrorPage";
import CategoryDetail from "./components/CategoryDetail";
import { CartProvider } from "./contexts/CartContext";
import Orders from "./components/Orders";
import ShoppingBasket from "./components/ShoppingBasket";

const App = () => {
  const { Header, Content, Footer } = Layout;

  let activeTabOnMenu = "";
  let location = useLocation();
  let currentPath = location.pathname;

  if (currentPath === "/") {
    activeTabOnMenu = "1";
  }
  if (currentPath === "/categories") {
    activeTabOnMenu = "2";
  }
  if (currentPath === "/products") {
    activeTabOnMenu = "3";
  }
  if (currentPath === "/orders") {
    activeTabOnMenu = "4";
  }

  return (
    <CartProvider>
      <Layout>
        <Header>
          <div className="logo"></div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[activeTabOnMenu]}
          >
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/categories">Categories</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/products">Products</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/orders">My Orders</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/cart"></Link>
              <ShoppingBasket />
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div className="site-layout-content">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/categories" element={<CategoryList />}></Route>
              <Route
                path="/categories/:id"
                element={<CategoryDetail />}
              ></Route>
              <Route path="/products" element={<ProductList />}></Route>
              <Route path="/products/:id" element={<ProductDetail />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/orders" element={<Orders />}></Route>
              <Route path="*" element={<ErrorPage />}></Route>
            </Routes>
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          @Copyright 2024
        </Footer>
      </Layout>
    </CartProvider>
  );
};

export default App;
