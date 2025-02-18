import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import "./RestaurantManagementPage.css";
import { FaEye } from "react-icons/fa";
import { toast } from "sonner";
import { IoMdArrowRoundBack } from "react-icons/io";

const capitalizeFirstLetter = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const RestaurantManagementPage = () => {
  const [menuData, setMenuData] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newSubCategoryName, setNewSubCategoryName] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [measures, setMeasures] = useState([]);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleAddCategory = () => {
    const formattedCategoryName = capitalizeFirstLetter(newCategoryName.trim());
    if (!formattedCategoryName) {
      alert("Category name cannot be empty.");
      return;
    }
    if (
      menuData.some(
        (category) =>
          category.category.toLowerCase() ===
          formattedCategoryName.toLowerCase()
      )
    ) {
      alert("Category already exists.");
      return;
    }
    fetch("http://localhost:8000/api/menu/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoryName: formattedCategoryName }),
    })
      .then((res) => res.json())
      .then((newCategory) => {
        setMenuData((prev) => [...prev, newCategory]);
        toast.success("Category Added Successfully!!!");
        setNewCategoryName("");
      })
      .catch((err) => console.error("Error adding category:", err));
  };

  const handleAddSubCategory = () => {
    const formattedSubCategoryName = capitalizeFirstLetter(
      newSubCategoryName.trim()
    );
    if (!selectedCategory || !formattedSubCategoryName) {
      alert("Please select a category and enter a subcategory name.");
      return;
    }
    const selectedCat = menuData.find((cat) => cat._id === selectedCategory);
    if (
      selectedCat &&
      selectedCat.subCategories.some(
        (subCat) =>
          subCat.name.toLowerCase() === formattedSubCategoryName.toLowerCase()
      )
    ) {
      alert("Subcategory already exists.");
      return;
    }
    fetch(`http://localhost:8000/api/menu/${selectedCategory}/subcategory`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subCategoryName: formattedSubCategoryName }),
    })
      .then((res) => res.json())
      .then((updatedCategory) => {
        setMenuData((prev) =>
          prev.map((cat) =>
            cat._id === updatedCategory._id ? updatedCategory : cat
          )
        );
        toast.success("Sub-Category Added Successfully!!!");
        setNewSubCategoryName("");
      })
      .catch((err) => console.error("Error adding subcategory:", err));
  };

  
  // const handleAddItem = () => {
  //   const formattedItemName = capitalizeFirstLetter(newItemName.trim());

  //   if (!selectedCategory || !selectedSubCategory || !formattedItemName) {
  //     alert("Please select a category, subcategory, and enter item details.");
  //     return;
  //   }

  //   if (!newItemPrice && measures.length === 0) {
  //     alert("Please provide either a single price or multiple measures.");
  //     return;
  //   }

  //   if (!selectedImage) {
  //     alert("Please provide  an image.");
  //     return;
  //   }

  //   const itemData = {
  //     name: formattedItemName,
  //     description: description.trim(),
  //     ...(measures.length > 0
  //       ? {
  //           measures: measures.map((m) => ({
  //             ...m,
  //             price: parseFloat(m.price),
  //           })),
  //         } // Ensure measures have correct price format
  //       : { price: parseFloat(newItemPrice) }), // Ensure single price is a number
  //       image: selectedImage,
  //   };

  //   console.log("Sending item data:", itemData); // Debugging

  //   fetch(
  //     `http://localhost:8000/api/menu/${selectedCategory}/subcategory/${selectedSubCategory}/item`,
  //     {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(itemData),
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((updatedCategory) => {
  //       console.log("Response received:", updatedCategory); // Debugging
  //       setMenuData((prev) =>
  //         prev.map((cat) =>
  //           cat._id === updatedCategory._id ? updatedCategory : cat
  //         )
  //       );

  //       setNewItemName("");
  //       setNewItemPrice("");
  //       setMeasures([]);
  //       setDescription(""); // Clear description
  //       toast.success("Menu Item Added Successfully!!!");
  //     })
  //     .catch((err) => console.error("Error adding item:", err));
  // };


  const handleAddItem = () => {
    const formattedItemName = capitalizeFirstLetter(newItemName.trim());
  
    if (!selectedCategory || !selectedSubCategory || !formattedItemName) {
      alert("Please select a category, subcategory, and enter item details.");
      return;
    }
  
    if (!newItemPrice && measures.length === 0) {
      alert("Please provide either a single price or multiple measures.");
      return;
    }
  
    if (!selectedImage) {
      alert("Please upload an image.");
      return;
    }
  
    const formData = new FormData();
    formData.append("name", formattedItemName);
    formData.append("description", description.trim());
    formData.append("image", selectedImage); // Append the image
  
    if (measures.length > 0) {
      formData.append("measures", JSON.stringify(measures)); // Convert measures to JSON string
    } else {
      formData.append("price", parseFloat(newItemPrice)); // Ensure it's a number
    }
  
    fetch(
      `http://localhost:8000/api/menu/${selectedCategory}/subcategory/${selectedSubCategory}/item`,
      {
        method: "POST",
        body: formData, // No need to set `Content-Type` manually
      }
    )
      .then((res) => res.json())
      .then((updatedCategory) => {
        setMenuData((prev) =>
          prev.map((cat) =>
            cat._id === updatedCategory._id ? updatedCategory : cat
          )
        );
  
        setNewItemName("");
        setNewItemPrice("");
        setMeasures([]);
        setDescription("");
        setSelectedImage(null);
        toast.success("Menu Item Added Successfully!!!");
      })
      .catch((err) => console.error("Error adding item:", err));
  };
  
  
  return (
    <div className="restaurant-management-container">
      <div className="main-content">
        <div
          className="absolute flex items-center gap-2 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <IoMdArrowRoundBack /> Back
        </div>
        <div className="restaurant-management-content">
          <h2>Restaurant Management</h2>
          <button
            className="view-menu-button"
            onClick={() => navigate("/restaurants/view-menu")}
          >
            <FaEye className="view-menu-icon" /> View Menu
          </button>
          <div className="form-container">
            <h3>Add New Category</h3>
            <div className="form-group">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Enter category name"
              />
              <button className="primary-button" onClick={handleAddCategory}>
                Add Category
              </button>
            </div>
          </div>
          <div className="form-container">
            <h3>Add New Subcategory</h3>
            <div className="form-group">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {menuData.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.category}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={newSubCategoryName}
                onChange={(e) => setNewSubCategoryName(e.target.value)}
                placeholder="Enter subcategory name"
              />
              <button className="primary-button" onClick={handleAddSubCategory}>
                Add Subcategory
              </button>
            </div>
          </div>
          <div className="form-container">
            <h3>Add New Item</h3>
            <div className="form-group">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {menuData.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.category}
                  </option>
                ))}
              </select>
              <select
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
              >
                <option value="">Select Subcategory</option>
                {menuData
                  .find((cat) => cat._id === selectedCategory)
                  ?.subCategories.map((subCat) => (
                    <option key={subCat._id} value={subCat._id}>
                      {subCat.name}
                    </option>
                  ))}
              </select>
              <input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Enter item name"
              />
              <input
                type="number"
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(e.target.value)}
                placeholder="Enter item price (or leave blank if using measures)"
              />
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />

              {/* Add measures dynamically */}
              <div className="measures-container">
                <h4>Measures (optional)</h4>
                {measures.map((measure, index) => (
                  <div key={index} className="measure-row">
                    <input
                      type="text"
                      value={measure.measure}
                      onChange={(e) =>
                        setMeasures((prev) =>
                          prev.map((m, i) =>
                            i === index ? { ...m, measure: e.target.value } : m
                          )
                        )
                      }
                      placeholder="Enter measure (e.g., 30ml)"
                    />
                    <input
                      type="number"
                      value={measure.price}
                      onChange={(e) =>
                        setMeasures((prev) =>
                          prev.map((m, i) =>
                            i === index ? { ...m, price: e.target.value } : m
                          )
                        )
                      }
                      placeholder="Enter price"
                    />

                    <button
                      onClick={() =>
                        setMeasures((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() =>
                    setMeasures((prev) => [...prev, { measure: "", price: "" }])
                  }
                >
                  Add Measure
                </button>
              </div>

              <button className="primary-button" onClick={handleAddItem}>
                Add Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantManagementPage;
