import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Input, Navbar } from "../components";
import { loginUser } from "../DAL/auth";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    new_keys: true,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleLogin = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const response = await loginUser(inputs);
      if (response.code === 200) {
        toast.success("Login Success");
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("customer", JSON.stringify(response?.data?.customer));
        navigate("/");
        return;
      } else {
        toast.error(response.message);
        return;
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleLogin}>
              <Input
                required
                name="email"
                label="Email"
                type="email"
                placeholder="Enter Email"
                readOnly={isLoading}
                onChange={onChange}
              />
              <Input
                required
                name="password"
                label="Password"
                type="password"
                placeholder="Enter Password"
                readOnly={isLoading}
                onChange={onChange}
              />
              <div className="text-center">
                <button className="my-2 w-100 btn btn-primary" type="submit">
                  Login
                </button>
              </div>
              <div className="my-3">
                <p>
                  New Here?{" "}
                  <Link
                    to="/register"
                    className="text-decoration-underline text-info"
                  >
                    Register
                  </Link>{" "}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
