import React, { useState } from "react";
import { Footer, Input } from "../components";
import { CATEGORIES_LIST } from "../utilities/constants";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../DAL/products";
import toast from "react-hot-toast";
const CreateProduct = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleCreateProduct = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();

      formData.append("name", inputs.name);
      formData.append("price", inputs.price);
      formData.append("image", inputs.image);
      formData.append("description", inputs.description);
      formData.append("category", inputs.category);

      const response = await addProduct(formData);
      if (response.code === 201) {
        toast.success("Product Created");
        navigate("/");
      } else {
        toast.error(response.message);
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
        <h1 className="text-center">Create New Product</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleCreateProduct}>
              <Input
                name="name"
                label="Product Name"
                placeholder="Enter Product Name"
                onChange={onChange}
                readOnly={isLoading}
                required
              />
              <Input
                name="price"
                label="Product Price"
                placeholder="Enter Product Price"
                onChange={onChange}
                readOnly={isLoading}
                type="number"
                required
              />
              <Input
                name="image"
                label="Product Image"
                onChange={(e) => {
                  console.log(e.target.name);
                  const { name, files } = e.target;
                  setInputs({ ...inputs, [name]: files?.[0] || "" });
                }}
                readOnly={isLoading}
                type="file"
                accept="image/*"
                required
              />
              <div className="form  my-3">
                <label htmlFor="category">Product Category</label>
                <select
                  name="category"
                  id="category"
                  className="form-select"
                  onChange={onChange}
                  disabled={isLoading}
                >
                  {CATEGORIES_LIST.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form  my-3">
                <label htmlFor="description">Product Description</label>
                <textarea
                  name="description"
                  readOnly={isLoading}
                  onChange={onChange}
                  rows={5}
                  className="form-control"
                  id="description"
                  placeholder="Enter Product Description"
                />
              </div>
              <div className="text-center">
                <button className="my-2 w-100 btn btn-success" type="submit">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateProduct;
