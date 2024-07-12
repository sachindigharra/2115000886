import { useContext, useEffect } from "react";
import CartContext from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { baseService } from "../network/services/baseService";
import { Table, Button } from "antd";
import CartStyles from "../assets/css/Cart.css";

const Cart = () => {
  const { cart, setCart, orders, setOrders } = useContext(CartContext);

  let navigate = useNavigate();

  const removeItem = (id) => {
    console.log(id);
    setCart((prev) => prev.filter((q) => q.id !== id));
  };

  console.log("cart:", cart);
  let totalPrice = 0;

  for (let i = 0; i < cart.length; i++) {
    totalPrice += parseFloat(cart[i].quantity) * parseFloat(cart[i].price);
  }

  useEffect(() => {
    console.log("orders state variable saved by useEffect");
    console.log(orders);
  }, [orders]);

  const sendOrder = async () => {
    // let obj = {...cart};
    let data = [];
    cart.forEach((product) => {
      data.push(product);
    });
    // console.log(data)
    // console.log(typeof(data))
    let obj = { ...data };

    await baseService.post(`/orders`, obj);
    await setOrders((prevOrders) => [...prevOrders, ...cart]);
    await setCart([]);
    console.log("orders state var", orders);
  };

  const columns = [
    {
      title: "Product ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      onCell: (record, rowIndex) => {
        return {
          onClick: (ev) => {
            navigate(`/products/${record.id}`);
          },
        };
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Remove from Basket",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button type="primary" danger onClick={() => removeItem(id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div style={{ width: "80%" }}>
        <Table dataSource={cart} columns={columns} />
      </div>
      <Button
        onClick={() =>
          sendOrder((prev) => {
            return { ...prev };
          })
        }
      >
        Order
      </Button>
      <h3>Total Shopping Cart Price: {`$${totalPrice.toFixed(2)}`}</h3>
    </>
  );
};

export default Cart;
