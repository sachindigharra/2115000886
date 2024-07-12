import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Table } from "antd"
import { useContext } from "react"
import CartContext from "../contexts/CartContext"

const Orders = () => {
    let navigate = useNavigate();
    const { orders } = useContext(CartContext)

    const columns = [
        {
            title: 'Product ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
            onCell: (record,rowIndex) => {
              return {
                onClick: (ev) => {
                  navigate(`/products/${record.id}`)
                }
              }
            }
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            
        }
      ];

  return (
    <>
    <div style={{ width: "80%"}}>
            <Table dataSource={orders} columns={columns}  />
        </div>
        
    </>
  )
}

export default Orders