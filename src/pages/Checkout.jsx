import React, { useState } from "react";
import { Footer, Input } from "../components";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addOrder } from "../DAL/orders";
const Checkout = () => {
  const state = useSelector((state) => state.handleCart);

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No item in Cart</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCheckout = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState({
      first_name: "",
      last_name: "",
      email: "",
      address_1: "",
      address_2: "",

      // payment
      "cc-name": "",
      "cc-number": "",
      "cc-expiration": "",
      "cc-cvv": "",
    });

    const onChange = (e) => {
      const { name, value } = e.target;

      setInputs({ ...inputs, [name]: value });
    };

    const handlePlaceOrder = async (e) => {
      try {
        setIsLoading(true);
        e.preventDefault();
        console.log(state);
        const customer = JSON.parse(localStorage.getItem("customer"));
        const payload = {
          products: state.map((product) => ({
            product: product._id,
            quantity: product.qty,
          })),
          customer: customer._id,
        };
        const response = await addOrder(payload);
        if (response.code === 201) {
          localStorage.removeItem("cart");
          toast.success("Order Placed Successully");
          window.location.href='/'
          return;
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    state.map((item) => {
      return (subtotal += item.price * item.qty);
    });

    state.map((item) => {
      return (totalItems += item.qty);
    });
    return (
      <>
        <div className="container py-5">
          <div className="row my-4">
            <div className="col-md-5 col-lg-4 order-md-last">
              <div className="card mb-4">
                <div className="card-header py-3 bg-light">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products ({totalItems})
                      <span>Rs{Math.round(subtotal)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>Rs{shipping}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>Rs{Math.round(subtotal + shipping)}</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h4 className="mb-0">Billing address</h4>
                </div>
                <div className="card-body">
                  <form
                    onSubmit={handlePlaceOrder}
                    // className="needs-validation"/
                  >
                    <div className="row g-3">
                      <Input
                        onChange={onChange}
                        containerClassName="col-sm-6 my-1"
                        label="First Name"
                        name="first_name"
                        readOnly={isLoading}
                        required
                      />
                      <Input
                        onChange={onChange}
                        containerClassName="col-sm-6 my-1"
                        label="Last Name"
                        name="last_name"
                        readOnly={isLoading}
                        required
                      />
                      <Input
                        onChange={onChange}
                        containerClassName="col-12 my-1"
                        label="Email"
                        name="email"
                        type="email"
                        readOnly={isLoading}
                        required
                      />

                      <Input
                        onChange={onChange}
                        containerClassName="col-12 my-1"
                        label="Address"
                        name="address_1"
                        readOnly={isLoading}
                        required
                      />
                      <Input
                        onChange={onChange}
                        containerClassName="col-12 my-1"
                        label={`Address 2 (Optional)`}
                        name="address_2"
                        readOnly={isLoading}
                      />
                    </div>
                    <hr className="my-5" />
                    <h4 className="mb-3">Payment</h4>
                    <div className="row gy-3">
                      <Input
                        onChange={onChange}
                        name="cc-name"
                        label="Card Holder Name"
                        containerClassName="col-md-6 "
                        required
                        readOnly={isLoading}
                      />
                      <Input
                        onChange={onChange}
                        name="cc-number"
                        label="Credit Card Number"
                        containerClassName="col-md-6 "
                        required
                        readOnly={isLoading}
                      />
                      <Input
                        onChange={onChange}
                        name="cc-expiration"
                        label="Expiration"
                        containerClassName="col-md-3 "
                        required
                        readOnly={isLoading}
                      />
                      <Input
                        onChange={onChange}
                        name="cc-cvv"
                        label="CVV"
                        containerClassName="col-md-3 "
                      />
                    </div>
                    <hr className="my-4" />
                    <button className="w-100 btn btn-primary " type="submit">
                      Continue to checkout
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {state.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
