import React, { useEffect, useState } from "react";
import { Footer, Input } from "../components";
import { CATEGORIES_LIST } from "../utilities/constants";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../DAL/products";
import toast from "react-hot-toast";
import { getOrders } from "../DAL/orders";
const Orders = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const response = await getOrders();
    if (response.code === 200) {
      setOrders(response.data.data);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  console.log(orders);
  return (
    <>
      <div className="container my-3 py-3">
        <h1 className="text-center">Orders</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-8 col-lg-6 col-sm-12 mx-auto">
            {orders.map((order) => (
              <div key={order._id} className="card mb-3 p-3">
                <h6 className="fw-bold">Order # : {order._id}</h6>
                <div className="px-4">
                  <p className="fw-medium">Products:</p>
                  <ul className="w-100">
                    {order.products.map((product) => (
                      <>
                        <li
                          key={product._id}
                          className="w-100 mb-1  border-bottom-1"
                        >
                          <div className="w-100 d-flex justify-content-between">
                            <span>
                              {product.product.name?.substring(0, 30)}...{" "}
                              <span className="px-3">x</span> (
                              {product.quantity})
                            </span>
                            <span className="text-end">
                              {product.product.price * product.quantity} Rs
                            </span>
                          </div>
                        </li>
                        <hr />
                      </>
                    ))}
                  </ul>
                  <p className="d-flex justify-content-end">
                    Shiping :
                    <div className="text-end" style={{ minWidth: 100 }}>
                      30 Rs
                    </div>
                  </p>
                  <p className=" text-end fw-medium d-flex justify-content-end">
                    Total :
                    <div className="text-end" style={{ minWidth: 100 }}>
                      {Number(order.total) + 30} Rs
                    </div>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Orders;
