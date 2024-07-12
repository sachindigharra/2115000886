import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { baseService } from "../network/services/baseService";
import ItemCard from "./ItemCard";
import CartContext from "../contexts/CartContext";

const CategoryDetail = () => {
  let navigate = useNavigate();

  const [allProducts, setAllProducts] = useState([]);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const data = await baseService.get("/products");
      setAllProducts(data);
    } catch (error) {
      console.log("Get all products error", error);
    }
  };

  let location = window.location.href;

  let idToUse = location.charAt(location.length - 1);

  let numberId = parseInt(idToUse);

  let categoriesProducts = [];
  categoriesProducts = allProducts.filter(
    (product) => product.categoryId === numberId
  );

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

  //  const columns = [
  //   {
  //       title: 'Product ID',
  //       dataIndex: 'id',
  //       key: 'id',
  //   },
  //   {
  //       title: 'Product Name',
  //       dataIndex: 'name',
  //       key: 'name',
  //       onCell: (record,rowIndex) => {
  //         return {
  //           onClick: (ev) => {
  //             navigate(`/products/${record.id}`)
  //           }
  //         }
  //       }
  //   },
  //   {
  //     title: 'Category ID',
  //     dataIndex: 'categoryId',
  //     key: 'categoryId',
  // },
  //   {
  //       title: 'Price',
  //       dataIndex: 'unitPrice',
  //       key: 'unitPrice',
  //   }
  // ];

  return (
    <>
      {/* <ul>
        {categoriesProducts.map(product => (
          <Link style={{color:'olive'}} to={`/products/${product.id}`}><li>Product Name: {product.name} - Product ID: {product.id} - Category ID: {product.categoryId}</li></Link>
        ))}
      </ul> */}
      {/* <div style={{ width: "50%"}}>
            <Table dataSource={categoriesProducts} columns={columns}  />
        </div> */}
      <h1 style={{ marginLeft: "2rem", marginTop: "1.5rem", fontSize: "2rem" }}>
        Categorie's Products
      </h1>
      <div className="wrapper">
        {categoriesProducts.map((catproduct, index) => {
          return (
            <ItemCard
              img=""
              title={catproduct.name}
              description={`${index + 1}. product's desc`}
              price={catproduct.unitPrice}
              addToCart={addToCart}
              completeProduct={catproduct}
              id={catproduct.id}
            />
          );
        })}
      </div>
    </>
  );
};

export default CategoryDetail;
