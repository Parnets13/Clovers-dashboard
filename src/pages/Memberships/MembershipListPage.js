import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import { FaSearch, FaFilter, FaEdit } from "react-icons/fa";
import "./MembershipListPage.css";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import { FaDeleteLeft } from "react-icons/fa6";
import axios from "axios";
import _ from "lodash";
import { Button, Modal, Space } from "antd";

const MembershipListPage = () => {
  const navigate = useNavigate();

  const [deleteModel, setdeltemodel] = useState(false);

  // State to hold all renewal records fetched from the backend
  const [renewals, setRenewals] = useState([]);
  const [nochabgesdata, setnochangesdata] = useState([]);

  const fetchRenewals = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/memberships");
      if (!response.ok) {
        throw new Error("Failed to fetch renewals");
      }
      const data = await response.json();
      setRenewals(data);
      setnochangesdata(data);
    } catch (error) {
      console.error("Error fetching renewals:", error);
    }
  };
  // Fetch the renewals when the component mounts
  useEffect(() => {
    fetchRenewals();
  }, []);

  // Open QR Modal

  const [AllBenifits, setAllbenifits] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    benefits: AllBenifits,
    price: "",
    membershipday: "",
    discount:"",
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const remove = (i) => {
    setAllbenifits(AllBenifits.filter((ele) => ele !== i));
    toast.success("Successfully delete!");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.membershipday || Number(formData.membershipday) <= 0)
      errors.membershipday = "Enter valid membership days.";
    if (!formData.description.trim())
      errors.description = "Description is required.";
    if (!AllBenifits.length) errors.benefits = "Provide at least one benefit.";
    if (!formData.price || Number(formData.price) <= 0)
      errors.price = "Enter a valid price.";
    if (!formData.type) errors.type = "Select membership type.";
    if (!formData.discount) errors.type = "Select discount.";

    setErrors(errors);
    // alert(Object.keys(errors).length === 0)
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.put(
        "http://localhost:8000/api/memberships/" + formData._id,
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

      if (response.status === 200) {
        setIsModalOpen(false);
        toast.success("Successfully updated");
        fetchRenewals();
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

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:8000/api/memberships/" + formData._id
      );
      if (response.status == 200) {
        toast.success("Successfully deleted");
        setdeltemodel(false);
        fetchRenewals();
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error.response.data.errors);
      } else {
        toast.error("Something went wrong");
      }
    }
  };



 

  const [data, setData] = useState([]);
  const getBenefit = async () => {
    const res = await axios.get("http://localhost:8000/api/benefit/get");
    setData(res.data.data);
  };

  useEffect(() => {
    getBenefit();
  }, []);

  return (
    <div className="memberships-container">
      <div className="main-content">
        <div className="memberships-content">
          {/* Header Section */}
          <div className="memberships-header">
            <h2>Membership Management</h2>
            <div className="memberships-actions flex items-center gap-3">
              <button
                className="primary-button"
                onClick={() => navigate("/memberships/create")}
              >
                New Membership
              </button>
              <button
                className="primary-button"
                onClick={() => navigate("/memberships/benefits")}
              >
                Benefits
              </button>
            </div>
          </div>

          {/* Renewal Table Section */}
          <h3>Recent Renewals</h3>
          <div className="renewal-table-wrapper">
            <table className="renewal-table">
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>Title</th>
                  <th>Membership Days</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Benefits</th>
                  <th>Discount</th>
                  <th>Add On</th>
                  <th>Actions</th> {/* New column */}
                </tr>
              </thead>
              <tbody>
                {renewals.length > 0 ? (
                  renewals.map((renewal, i) => (
                    <tr key={renewal._id}>
                      <td>{i + 1}</td>
                      <td>{renewal.type}</td>
                      <td>{renewal.membershipday}</td>
                      {/* <td>{renewal.type}</td> */}
                      <td>{renewal.price?.toFixed(2)}</td>
                      <td>{renewal.description}</td>
                      <td>
                        {renewal.benefits?.map((ele, e) => {
                          return (
                            <p>
                              {e + 1}. {ele}
                            </p>
                          );
                        })}
                      </td>
                      <td>{renewal.discount}%</td>
                      <td>{new Date(renewal.createdAt).toLocaleString()}</td>
                      <td>
                        {/* Button to view QR code in a modal */}
                        <div style={{ display: "flex", gap: "5px" }}>
                          <button
                            className="qr-button"
                            onClick={() => {
                              setAllbenifits(renewal.benefits);
                              setFormData(renewal);
                              setIsModalOpen(true);
                            }}
                            style={{
                              color: "#C5A48A",
                              border: "none",
                              borderRadius: "50px",
                              padding: "7px 9px",
                              cursor: "pointer",
                            }}
                          >
                            <FaEdit size={20} />
                          </button>
                          <button
                            style={{
                              color: "red",
                              border: "none",
                              borderRadius: "50px",
                              padding: "7px 9px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setdeltemodel(true);
                              setFormData(renewal);
                            }}
                            className="qr-button"
                          >
                            <MdDelete size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">
                      No membership found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <Modal
          title="Confirm Delete"
          open={deleteModel}
          onOk={handleDelete}
          onCancel={() => setdeltemodel(false)}
          okText="Yes, Delete"
          cancelText="Cancel"
          okButtonProps={{ danger: true }}
        >
          <p>
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>
        </Modal>

        {/* Simple Modal for QR Code */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm ">
            {/* Modal Container */}
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl h-[600px] overflow-y-scroll">
              {/* Modal Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 ">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Update Membership Plan
                </h2>
                <button
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md "
                  onClick={() => setIsModalOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <form className="space-y-6">
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
                      <option value="life">Life</option>
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
                  <div>
                    <label
                      htmlFor="membershipday"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Membership Days
                    </label>
                    <input
                      type="number"
                      name="membershipday"
                      value={formData.membershipday}
                      onChange={handleChange}
                      placeholder="e.g. 30"
                      min="1"
                      className={`mt-1 block w-full px-4 py-2 border ${
                        errors.membershipday
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.membershipday && (
                      <small className="text-red-500">
                        {errors.membershipday}
                      </small>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Provide a brief description of the membership."
                      className={`mt-1 block w-full px-4 py-2 border ${
                        errors.description
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.description && (
                      <small className="text-red-500">
                        {errors.description}
                      </small>
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
                      class="py-2.5 px-5 me-2  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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
                      <small className="text-red-500">{errors.price}</small>
                    )}
                  </div>
                  {/* Discount */}
                  <div className="form-group">
                    <label htmlFor="discount">Discount</label>
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
                      <small className="text-red-500">{errors.discount}</small>
                    )}
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="button"
                    className="w-full py-3 px-4  text-white font-bold rounded-lg shadow-md hover:from-blue-500  focus:outline-none focus:ring-2 primary-button "
                    onClick={handleSubmit}
                  >
                    Update Membership
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembershipListPage;
