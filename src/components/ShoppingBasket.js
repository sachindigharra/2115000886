import React, { useState, useContext } from 'react'
import CartContext from '../contexts/CartContext'
import ShoppingBaskett from '../assets/css/ShoppingBasket.css'

const ShoppingBasket = () => {

    const { cart } = useContext(CartContext);
    let quantity = 0;
     cart.forEach(product => {
        quantity += product.quantity;
    })

  return (
      <>
        <i className="fa" style={{fontSize:'24px'}}>&#xf07a;</i>
        <span className='badge badge-warning' id='lblCartCount'> {quantity} </span>
    </>
  )
}

export default ShoppingBasket