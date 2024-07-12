import React, { useState, useLayoutEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { baseService } from "../network/services/baseService";
import ItemCard from "../components/ItemCard";
import CartContext from "../contexts/CartContext";

const Home = () => {
  let navigate = useNavigate();
  const [wholeProducts, setWholeProducts] = useState([]);
  const { cart, setCart } = useContext(CartContext);

  useLayoutEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const data = await baseService.get("/products");
      setWholeProducts(data);
    } catch (error) {
      console.log("Get whole products error", error);
    }
  };

  let productsToRender = [];
  productsToRender = [...wholeProducts];

  let finalArr = productsToRender
    .sort(function (a, b) {
      return a.unitPrice - b.unitPrice;
    })
    .reverse()
    .slice(0, 10);

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
        Our New Products
      </h1>
      <div className="wrapper">
        {finalArr.map((product, index) => {
          return (
            <ItemCard
              img="https://images.unsplash.com/photo-1612077330269-788066d5ba58?crop=entropy&cs=srgb&fm=jpg&ixid=MXwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHw&ixlib=rb-1.2.1&q=85"
              title={product.name}
              description={`${index + 1}. product's desc`}
              price={product.unitPrice}
              addToCart={addToCart}
              completeProduct={product}
              id={product.id}
            />
          );
        })}
      </div>
    </>
  );
};

export default Home;
