import React from "react";
import { useNavigate } from "react-router-dom";
const CategoryCard = (props) => {
  let navigate = useNavigate();

  return (
    <div className="category__card">
      <div className="category__card__body">
        <img src={props.img} alt="img" class="category__card__image" />
        <h2 className="category__card__title">{props.title}</h2>
        <p className="category__card__description">{props.description}</p>
      </div>
      <button
        onClick={() => navigate(`/categories/${props.id}`)}
        className="category__card__btn"
      >
        View the Categorie's Products
      </button>
    </div>
  );
};

export default CategoryCard;
