import React, { useState, useContext, useEffect, useRef } from "react";
import { baseService } from "../network/services/baseService";
import { useParams, useNavigate } from "react-router-dom";
import CartContext from "../contexts/CartContext";
import Colors from "./Colors";
import DetailsThumb from "./DetailsThumb";
import ProductDetailsStyles from "../assets/css/ProductDetails.css";

const ProductDetail = () => {
  let navigate = useNavigate();

  const [productsDetail, setProductsDetail] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    getProducts();
  }, []);

  let myRef = useRef(null);

  let handleTab = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
    const images = this.myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[selectedIndex].className = "active";
  };

  // useEffect(() => {
  //   myRef.current.children[selectedIndex].className = "active";
  // });

  const getProducts = async () => {
    try {
      const data = await baseService.get(`/products/${ID}`);
      setProductsDetail(data);
    } catch (error) {
      console.log("Get products error", error);
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

  let { id } = useParams();
  let ID = parseInt(id);

  console.log("productsDetail:", productsDetail);

  const item = [
    {
      src: [
      ],
      colors: ["red", "black", "crimson", "teal"],
      description: "",
      content:
        "",
    },
  ];

  return (
    <div className="app">
      <div className="product__details">
        <div className="big__img">
          <img src={item[0]?.src[selectedIndex]} alt="" />
        </div>

        <div className="product__box">
          <div className="product__row">
            <h2>{productsDetail.name}</h2>
            <span>${productsDetail.unitPrice}</span>
          </div>
          <Colors colors={item[0].colors} />

          <p>{item[0].description}</p>
          <p>{item[0].content}</p>

          <DetailsThumb images={item[0].src} tab={handleTab} />
          <button
            className="product__cart"
            onClick={() => addToCart(productsDetail)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
