import React, { useState, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "antd";
import { baseService } from "../network/services/baseService";
import CategoryCard from "./CategoryCard";
import CategoryListStyles from "../assets/css/CategoryList.css";

const CategoryList = () => {
  let navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useLayoutEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const data = await baseService.get("/categories");
      setCategories(data);
    } catch (error) {
      console.log("Get categories error", error);
    }
  };

  // const columns = [
  //   {
  //     title: "ID",
  //     dataIndex: "id",
  //     key: "id",
  //   },
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     key: "name",
  //     onCell: (record, rowIndex) => {
  //       return {
  //         onClick: (ev) => {
  //           navigate(`/categories/${record.id}`);
  //         },
  //       };
  //     },
  //   },
  //   {
  //     title: "Description",
  //     dataIndex: "description",
  //     key: "description",
  //   },
  // ];

  return (
    <>
      {/* <div style={{ width: "80%" }}>
        <Table
          dataSource={categories.sort((a, b) => a.id - b.id)}
          columns={columns}
        />
      </div> */}
      <h1 style={{ marginTop: "1.5rem", fontSize: "2rem" }}>All Categories</h1>
      <div className="category__wrapper">
        {categories.map((category, index) => {
          return (
            <CategoryCard
              img=""
              title={category.name}
              description={category.description}
              id={category.id}
            />
          );
        })}
      </div>
    </>
  );
};

export default CategoryList;
