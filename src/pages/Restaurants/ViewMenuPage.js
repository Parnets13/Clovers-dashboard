import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa"; // For delete icons
import { BiEdit } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import axios from "axios";
import "./ViewMenuPage.css";
import { Modal, Button, Form, Input, message, Menu } from "antd";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const ViewMenuPage = () => {
  const [menuData, setMenuData] = useState([]);
  const [currentSection, setCurrentSection] = useState("veg"); // Default to 'veg'
  const [selectedItems, setSelectedItems] = useState([]); // To track selected items/subcategories
  const [category, setCategory] = useState([]);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [isSubCategoryModalVisible, setIsSubCategoryModalVisible] =
    useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [editSubCategory, setEditSubCategory] = useState(null);
  const [btn, setBtn] = useState("Category");

  const [categoryForm] = Form.useForm();
  const [subCategoryForm] = Form.useForm();

  useEffect(() => {
    fetch("http://localhost:8000/api/menu")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMenuData(data);
        } else {
          console.error("Expected an array but received:", data);
        }
      })
      .catch((err) => console.error("Error fetching menu data:", err));
  }, []);

  const getCategory = async () => {
    const res = await axios.get("http://localhost:8000/api/menu/getCategory");
    setCategory(res.data.data);
    console.log(res);
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleEditCategoryClick = (category) => {
    setEditCategory(category);
    setIsCategoryModalVisible(true);
    categoryForm.setFieldsValue({
      id: category.id || category._id,
      categoryName: category.category,
    });
  };

  const handleEditClick = (subCategory, id) => {
    console.log("first", subCategory, id);
    setEditSubCategory(subCategory);
    setIsSubCategoryModalVisible(true);
    subCategoryForm.setFieldsValue({
      id: id,
      name: subCategory.name,
      subCategoryId: subCategory.id || subCategory._id,
    });
  };

  const handleCategoryModalClose = () => {
    setIsCategoryModalVisible(false);
    setEditCategory(null);
  };

  const handleSubCategoryModalClose = () => {
    setIsSubCategoryModalVisible(false);
    setEditSubCategory(null);
  };

  const handleCategoryFormSubmit = async () => {
    try {
      let res = await axios.post(
        "http://localhost:8000/api/menu/editCategory",
        {
          id: categoryForm.getFieldValue("id"),
          categoryName: categoryForm.getFieldValue("categoryName"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        console.log("Updated Category:", res);
        handleCategoryModalClose();
        message.success("Category updated successfully!");
        getCategory();
      }
    } catch (error) {
      console.error("Error updating category:", error);
      message.error("Failed to update category");
    }
  };

  const handleSubCategoryFormSubmit = async () => {
    try {
      let res = await axios.put(
        "http://localhost:8000/api/menu/editSubCategory",
        {
          id: subCategoryForm.getFieldValue("id"),
          name: subCategoryForm.getFieldValue("name"),
          subCategoryId: subCategoryForm.getFieldValue("subCategoryId"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        console.log("Updated SubCategory:", res);
        handleSubCategoryModalClose();
        message.success("SubCategory updated successfully!");
        getCategory();
      }
    } catch (error) {
      console.error("Error updating subcategory:", error);
      message.error("Failed to update subcategory");
    }
  };

  const handleCategoryDelete = async (id) => {
    try {
      let res = await axios.delete(
        `http://localhost:8000/api/menu/deleteCategory/${id}`
      );
      if (res.status === 200) {
        console.log("Deleted Category:", res);
        message.success("Category deleted successfully!");
        getCategory();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      message.error("Failed to delete category");
    }
  };

  const handleSubCategoryDelete = async (id, subCategoryId) => {
    try {
      let res = await axios.delete(
        `http://localhost:8000/api/menu/deleteSubCategory/${id}/${subCategoryId}`
      );
      if (res.status === 200) {
        console.log("Deleted SubCategory:", res);
        message.success("SubCategory deleted successfully!");
        getCategory();
      }
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      message.error("Failed to delete subcategory");
    }
  };

  return (
    <div className="view-menu-container">
      <div className="main-content">
        <div className="view-menu-content">
          <h2 className="menu-title">Restaurant Menu</h2>

          <div className="flex justify-between items-center">
            <div className="menu-buttons">
              <button
                className="menu-button"
                onClick={() => setBtn("Category")}
              >
                Category
              </button>
              <button
                className="menu-button"
                onClick={() => setBtn("SubCategory")}
              >
                Sub-Category
              </button>
              <button
                className="menu-button"
                onClick={() => setBtn("MenuItems")}
              >
                Menu Items
              </button>
            </div>

            <div>
              <Link to="/restaurants/management">
                <button className="primary-button">Add Menu Item</button>
              </Link>
            </div>
          </div>

          {btn === "Category" ? (
            <table className="menu-table">
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {category.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.category}</td>
                    <td className="flex items-center gap-2 mt-2">
                      <BiEdit
                        className="text-blue-500"
                        onClick={() => handleEditCategoryClick(item)}
                      />
                      <FiDelete
                        className="text-red-500"
                        onClick={() => {
                          handleCategoryDelete(item._id);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            ""
          )}

          {btn === "SubCategory" ? (
            <table className="menu-table">
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Sub Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {category.flatMap((item, index) =>
                  item.subCategories.map((subCategory, subIndex) => (
                    <tr key={subCategory._id}>
                      <td>{index + 1}</td>
                      <td>{subCategory.name}</td>
                      <td className="flex items-center gap-2 mt-2">
                        <BiEdit
                          className="text-blue-500"
                          onClick={() => handleEditClick(subCategory, item._id)}
                        />
                        <FiDelete
                          className="text-red-500"
                          onClick={() =>
                            handleSubCategoryDelete(item._id, subCategory._id)
                          }
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : (
            ""
          )}

          {/* {btn === "MenuItems" ? (
            <table className="menu-table">
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Category</th>
                  <th>SubCategory</th>
                  <th>Items</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {category.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.category}</td>
                    <td className="flex flex-col gap-2 mt-2">
                      {item.subCategories.map((subCategory, subIndex) => (
                        <div key={subIndex}>
                          {subIndex + 1}. {subCategory.name}
                        </div>
                      ))}
                    </td>
                    <td className=" gap-2 mt-2">
                     
                    </td>
                    <td className="flex gap-2 items-center">
                      <BiEdit className="text-blue-500" />
                      <FiDelete className="text-red-500" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            ""
          )} */}

          {btn === "MenuItems" && (
            <div className="menu-container px-5">
              {category.map((item, index) => (
                <div
                  key={index}
                  className="category-section border border-gray-500 mt-5"
                >
                  <h3 className="mt-3 px-3 ">
                    <span className="font-semibold">
                      {index + 1}. Category-
                    </span>{" "}
                    <strong>{item.category}</strong>
                  </h3>
                  {item.subCategories.map((subCategory, subIndex) => (
                    <div
                      key={subCategory._id}
                      className="subcategory-section mt-2 "
                    >
                      <h4 className="px-6">
                        <span className="font-semibold">
                          {subIndex + 1}. Sub-Category-
                        </span>
                        <strong>{subCategory.name}</strong>
                      </h4>
                      {subCategory.items.map((menuItem, itemIndex) => (
                        <div
                          key={menuItem._id}
                          className="item-section ml-4 flex items-center gap-2 px-9"
                        >
                          <div className="flex flex-col items-start gap-1">
                            <p className="flex items-center gap-2">
                              {itemIndex + 1}.
                              <span className="font-semibold w-40">
                                {menuItem.name} - ₹{menuItem.price}
                              </span>
                            </p>
                            <div className="flex justify-start items-start gap-5">
                              <img
                                src={`http://localhost:8000/menu/${menuItem.image}`}
                                alt=""
                                className="w-40 rounded-md"
                              />
                              <p className="">
                                <span className="font-semibold">
                                  Description:
                                </span>
                                {menuItem.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 mt-4 mb-4">
                              <BiEdit
                                className="text-blue-500 ml-2"
                                // onClick={() =>
                                //   handleEditItemClick(menuItem, subCategory)
                                // }
                              />
                              <FiDelete
                                className="text-red-500 ml-2"
                                // onClick={() =>
                                //   handleItemDelete(menuItem._id, subCategory._id)
                                // }
                              />
                            </div>
                          </div>
                          {menuItem.measures &&
                            menuItem.measures.length > 0 && (
                              <ul>
                                {menuItem.measures.map((measure) => (
                                  <li key={measure._id}>
                                    {measure.measure} - ₹{measure.price}
                                  </li>
                                ))}
                              </ul>
                            )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          <Modal
            title={`Edit Category - ${editCategory?.category}`}
            visible={isCategoryModalVisible}
            onCancel={handleCategoryModalClose}
            footer={null}
          >
            <Form form={categoryForm} onFinish={handleCategoryFormSubmit}>
              <Form.Item name="categoryName" label="Category Name">
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save Changes
                </Button>
                <Button
                  onClick={handleCategoryModalClose}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          </Modal>

          <Modal
            title={`Edit SubCategory - ${editSubCategory?.name}`}
            visible={isSubCategoryModalVisible}
            onCancel={handleSubCategoryModalClose}
            footer={null}
          >
            <Form form={subCategoryForm} onFinish={handleSubCategoryFormSubmit}>
              <Form.Item name="name" label="SubCategory Name">
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save Changes
                </Button>
                <Button
                  onClick={handleSubCategoryModalClose}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ViewMenuPage;
