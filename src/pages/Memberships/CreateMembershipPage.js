import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import "./CreateMembershipPage.css";
import { FaDeleteLeft } from "react-icons/fa6";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";
const CreateMembershipPage = () => {
  const [formData, setFormData] = useState({
    description: "",
    price: "",
    membershipday: "",
    age: 0,
    type: "",
    discount: "",
    creditLimit:""
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [AllBenifits, setAllbenifits] = useState([]);
  const [benefit, setBenefits] = useState("");

  const AddBenifits = () => {
    if (!benefit) {
      errors.benefits = "Please enter benefit.";
    }
    let check = AllBenifits.find((ele) => ele == benefit);
    if (check) return (errors.benefits = "Already exits.");
    setAllbenifits([...AllBenifits, benefit]);
    errors.benefits = "";
    setBenefits("");
  };

  const validateForm = () => {
    const errors = {};
    // if (!formData.name.trim()) errors.name = "Membership title is required.";
    if (!formData.membershipday || Number(formData.membershipday) <= 0)
      errors.membershipday = "Enter valid membership days.";
    if (!formData.description.trim())
      errors.description = "Description is required.";
    if (AllBenifits.length == 0)
      errors.benefits = "Provide at least one benefit.";
    if (!formData.price || Number(formData.price) <= 0)
      errors.price = "Enter a valid price.";
    if (!formData.discount || Number(formData.discount) <= 0)
      errors.discount = "Enter a valid discount.";
    // if (!formData.type) errors.type = "Select membership type.";
    if (
      formData.type === "senior" &&
      (!formData.age || Number(formData.age) <= 0)
    ) {
      errors.age = "Enter a valid age for senior membership.";
    }
    setErrors(errors);
    // alert( Object.keys(errors).length === 0)
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    console.log("first");

    if (!validateForm()) return;
    // alert("colling")
    try {
      const response = await axios.post(
        "http://localhost:8000/api/memberships",
        {
          ...formData,
          benefits: AllBenifits,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      if (response.status === 201) {
        toast.success("Successfully created");
        navigate(-1);
      }
    } catch (error) {
      console.error("Error creating membership:", error);
      if (error.response) {
        toast.error(error.response.data.errors);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const remove = (i) => {
    setAllbenifits(AllBenifits.filter((ele) => ele !== i));
    toast.success("Successfully delete!");
  };

  const [data, setData] = useState([]);

  const getBenefit = async () => {
    const res = await axios.get("http://localhost:8000/api/benefit/get");
    setData(res.data.data);
  };

  console.log("first", formData.type);

  useEffect(() => {
    getBenefit();
  }, []);

  return (
    <div className="member-detail-content">
      <div className="main-content">
        <div
          className="absolute flex items-center gap-2 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <IoMdArrowRoundBack /> Back
        </div>
        <div className="create-membership-page">
          <div className="form-wrapper">
            <h2>Create New Membership Plan</h2>
            <form className="form">
              {/* Membership Title */}
              <div className="form-group">
                <label htmlFor="type">Membership Title</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={errors.type ? "error" : ""}
                >
                  <option value="">Select type...</option>
                  <option value="lifetime">Life</option>
                  <option value="platinum">Platinum</option>
                  <option value="senior">Senior</option>
                  <option value="corporate">Corporate</option>
                  <option value="temporary">Temporary</option>
                  <option value="guest">Guest</option>
                </select>
                {errors.type && (
                  <small className="error-text">{errors.type}</small>
                )}
              </div>

              {/* Membership Days */}
              <div className="form-group">
                <label htmlFor="membershipday">Membership Days</label>
                <input
                  type="number"
                  name="membershipday"
                  value={formData.membershipday}
                  onChange={handleChange}
                  placeholder="e.g. 30"
                  min="1"
                  className={errors.membershipday ? "error" : ""}
                />
                {errors.membershipday && (
                  <small className="error-text">{errors.membershipday}</small>
                )}
              </div>

              {/* Description */}
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide a brief description of the membership."
                  className={errors.description ? "error" : ""}
                />
                {errors.description && (
                  <small className="error-text">{errors.description}</small>
                )}
              </div>

              {/* Benefits */}
              <div className="form-group">
                <div className="form-group">
                  <label htmlFor="benefits">Benefits </label>
                  <select onChange={(e) => setBenefits(e.target.value)}>
                    <option value="">Select Benefit</option>
                    {data.map((benefit, index) => (
                      <option value={benefit.name} key={index}>
                        {benefit.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.benefits && (
                  <small className="error-text">{errors.benefits}</small>
                )}
                <button
                  type="button"
                  class="py-2.5 px-5 me-2 mb-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={() => AddBenifits()}
                >
                  Add
                </button>
              </div>
              {AllBenifits.map((ele, i) => {
                return (
                  <div className="flex justify-around mb-5">
                    <p>
                      {i + 1}. {ele}
                    </p>
                    <p className="cursor-pointer" title="remove">
                      <FaDeleteLeft
                        color="red"
                        size={20}
                        onClick={() => remove(ele)}
                      />
                    </p>
                  </div>
                );
              })}
              {/* Price */}
              <div className="form-group">
                <label htmlFor="price">Price (in INR)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 200"
                  min="1"
                  className={errors.price ? "error" : ""}
                />
                {errors.price && (
                  <small className="error-text">{errors.price}</small>
                )}
              </div>

              {/* Membership Type */}

              {/* Age (Only for Senior Memberships) */}
              {formData.type === "senior" && (
                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="e.g. 60"
                    min="1"
                    className={errors.age ? "error" : ""}
                  />
                  {errors.age && (
                    <small className="error-text">{errors.age}</small>
                  )}
                </div>
              )}

              {/* Discount */}
              <div className="form-group">
                <label htmlFor="discount">Discount (in %)</label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  placeholder="e.g. 10"
                  min="1"
                  className={errors.discount ? "error" : ""}
                />
                {errors.discount && (
                  <small className="error-text">{errors.discount}</small>
                )}
              </div>

                 {/* Credit imit */}
                 <div className="form-group">
                <label htmlFor="creditLimit">Credit Limit</label>
                <input
                  type="number"
                  name="creditLimit"
                  value={formData.creditLimit}
                  onChange={handleChange}
                  placeholder="e.g. 100000"
                  min="1"
                  className={errors.creditLimit ? "error" : ""}
                />
                {errors.creditLimit && (
                  <small className="error-text">{errors.creditLimit}</small>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="button"
                className="primary-button"
                onClick={handleSubmit}
              >
                Create Membership
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMembershipPage;
