import React, { useState, useEffect, useContext } from "react";
import { baseService } from "../network/services/baseService";
import { useNavigate } from "react-router-dom";
import ItemCard from "./ItemCard";
import Loader from "./Loader";
import CartContext from "../contexts/CartContext";

const PAGE_NUMBER = 1;

const ProductList = () => {
  const { cart, setCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    setTimeout(async () => {
      getProducts();
    }, 500);
  }, [page]);

  const getProducts = async () => {
    try {
      const data = await baseService.get(
        `/products?_page=${PAGE_NUMBER}_limit=1`
      );
      setProducts((prev) => {
        return [...prev, ...data];
      });
      setLoading(false);
    } catch (error) {
      console.log("Get products error", error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setPage((prev) => prev + 1);
    }
  };

  const addToCart = (product) => {
    let cartProduct = cart.find((q) => q.id === product.id);

    console.log(cartProduct);

    if (cartProduct) {
      cartProduct.quantity += 1;

      setCart([...cart]);
    } else {
      const cartProduct = {
        id: product.id,
        name: product.name,
        price: product.unitPrice,
        quantity: 1,
      };

      setCart((prev) => [...prev, cartProduct]);
    }
  };

  return (
    <>
      <h1 style={{ marginLeft: "2rem", marginTop: "1.5rem", fontSize: "2rem" }}>
        All Products
      </h1>
      <div className="wrapper">
        {products.map((product, index) => {
          return (
            <ItemCard
              img=""
              title={product.name}
              description={`${index + 1}. product's desc`}
              price={product.unitPrice}
              addToCart={addToCart}
              completeProduct={product}
              id={product.id}
            />
          );
        })}
        {loading && <Loader />}
      </div>
    </>
  );
};

export default ProductList;
