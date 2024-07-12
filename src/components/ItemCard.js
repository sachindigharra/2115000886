import React from "react";
import { useNavigate } from "react-router-dom";
import ItemCardStyles from "../assets/css/ItemCard.css";

const ItemCard = (props) => {
  let navigate = useNavigate();

  return (
    <div className="card">
      <img
        onClick={() => navigate(`/products/${props.id}`)}
        src={props.img}
        alt="img"
        className="card__img"
      />
      <div className="card__body">
        <h2
          onClick={() => navigate(`/products/${props.id}`)}
          className="card__title"
        >
          {props.title}
        </h2>
        <p className="card__description">{props.description}</p>
        <h3 className="card__price">{props.price}</h3>
        <button
          onClick={() => props.addToCart(props.completeProduct)}
          className="card__btn"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
