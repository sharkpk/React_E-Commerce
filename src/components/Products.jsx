import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getProducts } from "../DAL/products";
import { CATEGORIES_LIST } from "../utilities/constants";

const Products = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const fetchProducts = async () => {
    setLoading(true);
    const category = searchParams.get("category") || "";
    const response = await getProducts(category);
    if (response.code === 200) {
      setData(response?.data?.data);
      setFilter(response?.data?.data);
      setLoading(false);
    } else {
      toast.error("Error while Getting Products");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    if (cat) {
      navigate(`?category=${cat}`);
    } else {
      navigate("/");
    }
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          {CATEGORIES_LIST.map((category) => (
            <button
              key={category.value}
              className="btn btn-outline-dark btn-sm m-2"
              onClick={() => filterProduct(category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {filter.map((product) => {
          return (
            <div
              id={product._id}
              key={product._id}
              className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
            >
              <div className="card text-center h-100" key={product._id}>
                <img
                  className="card-img-top p-3"
                  src={product.image}
                  alt="Card"
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product?.name?.substring(0, 12)}...
                  </h5>
                  <p className="card-text">
                    {product?.description?.substring(0, 90)}...
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">Rs {product.price}</li>
                </ul>
                <div className="card-body">
                  <Link
                    to={"/product/" + product._id}
                    className="btn btn-dark m-1"
                  >
                    Buy Now
                  </Link>
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => {
                      toast.success("Added to cart");
                      addProduct(product);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
