import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Input, Navbar } from "../components";
import { registerUser } from "../DAL/auth";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleCreateUser = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      //validations
      const { password, confirm_password } = inputs;
      if (password !== confirm_password) {
        return toast.error("Password and Confirm password not same!");
      }

      const response = await registerUser(inputs);

      if (response?.code === 201) {
        toast.success("User Created Successfully");
        navigate("/login");
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
        <h1 className="text-center">Register</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleCreateUser}>
              <Input
                name="first_name"
                label="First Name"
                placeholder="Enter First Name"
                onChange={onChange}
                readOnly={isLoading}
              />
              <Input
                name="last_name"
                label="Last Name"
                placeholder="Enter Last Name"
                onChange={onChange}
                readOnly={isLoading}
              />
              <Input
                name="email"
                label="Email"
                type="email"
                placeholder="Enter Email"
                onChange={onChange}
                readOnly={isLoading}
              />
              <Input
                name="password"
                label="Password"
                type="password"
                placeholder="Enter Password"
                onChange={onChange}
                readOnly={isLoading}
              />
              <Input
                name="confirm_password"
                label="Confirm Pasword"
                type="password"
                placeholder="Enter Confirm Password"
                onChange={onChange}
                readOnly={isLoading}
              />
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="my-2 w-100 btn btn-primary"
                >
                  Register
                </button>
              </div>
              <div className="my-3">
                <p>
                  Already has an account?{" "}
                  <Link
                    to={isLoading ? "#" : "/login"}
                    className="text-decoration-underline text-info"
                  >
                    Login
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

export default Register;
