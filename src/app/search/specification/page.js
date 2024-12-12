"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import DownloadPDF from "@/components/DownloadPDF";

export default function SpecificationSearch() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [categories, setCategories] = useState({});
  const [specifications, setSpecifications] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [specInput, setSpecInput] = useState("");
  const [specValueInput, setSpecValueInput] = useState("");
  const [specificationData, setSpecificationData] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Fetch categories and specifications data
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/category_specs.json");
        const data = await response.json();
        setCategories(data.categories || {});
      } catch (error) {
        console.error("Failed to load categories and specifications:", error);
      }
    }

    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);
    setSpecifications(categories[selectedCategory] || []);
  };

  const handleSearchTypeChange = (e) => {
    const selectedType = e.target.value;
    setSearchType(selectedType);
    if (selectedType) {
      router.push(`/${selectedType}`);
    }
  };

  const handleSpecInputChange = (e) => {
    setSpecInput(e.target.value);
  };

  const handleSpecValueChange = (e) => {
    setSpecValueInput(e.target.value);
  };

  const handleAddSpecification = () => {
    if (specInput && specValueInput) {
      setSpecificationData((prevData) => ({
        ...prevData,
        [specInput]: specValueInput,
      }));
      setSpecInput("");
      setSpecValueInput("");
    }
  };

  const handleRemoveSpecification = (key) => {
    setSpecificationData((prevData) => {
      const updatedData = { ...prevData };
      delete updatedData[key];
      return updatedData;
    });
  };

  const onSubmit = async (data) => {
    const payload = {
      name: data.itemName,
      type: data.itemType,
      specifications: specificationData,
    };

    console.log("Payload to API:", payload);

    setIsLoading(true); // Start loading spinner

    try {
      const response = await axios.post(
        "http://192.168.155.164:3001/api/search/spec-searching",
        payload
      );
      console.log("Response from API:", response.data);

      // Assuming response.data contains search results
      setSearchResults(response.data.results || []);

      // Transform the response data into a usable format
      const arr = response.data.products.map((product, index) => ({
        id: index + 1,
        // model: product.make,
        model: product.model,
        rating: product.rating || "N/A",
        quantity: product.quantity || "1",
        price: product.currentPrice || "N/A", // Add price if available
        source: product.source?.[0]?.link || "N/A",
        sourceName: product.source?.[0]?.sourceName || "N/A",
        lastUpdated: product.pricehistory?.[0]?.price || "N/A",
        vintage: product.vintage[0].date || "N/A",
      }));
      console.log("Transformed data:", arr);

      setSearchResults(arr);
    } catch (error) {
      console.error("Failed to send data to API:", error);
    }
    setIsLoading(true);
  };

  return (
    <div className="min-h-screen pt-20 flex flex-col items-center text-sm bg-white px-4">
      <div className=" w-1/2 items-center flex flex-col">
        <div className="flex w-full flex-col  gap-5 py-3 bg-yellow-40">
          <div className="font-bold flex flex-col h- py-2 shadow rounded-3xl gap-2 bg-gray-100 items-center w-full mx-auto px-2 sm:mx-0">
            <h2>Select search type</h2>
            <select
              className="px-2 py-2 rounded-full font-semibold w-full  border"
              onChange={handleSearchTypeChange}
              value={searchType}
            >
              <option value="">Select Search Type</option>
              <option value="search/make-model">Make/Model</option>
              <option value="search/specification">Specification</option>
              <option value="search/service">Service</option>
            </select>
          </div>
        </div>

        {/* Form for Item Name and Type */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full bg-gray-100 p-6 rounded-3xl shadow"
        >
          <div className="w-full">
            <label
              htmlFor="itemName"
              className="block text-gray-700 font-bold mb-2"
            >
              Item Name
            </label>
            <input
              id="itemName"
              type="text"
              placeholder="Enter item name"
              {...register("itemName", { required: "Item Name is required" })}
              className="block px-3 py-2 border w-full rounded-3xl"
            />
            {errors.itemName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.itemName.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <label
              htmlFor="itemType"
              className="block text-gray-700 font-bold mb-2"
            >
              Item Type
            </label>
            <select
              id="itemType"
              {...register("itemType", { required: "Item Type is required" })}
              className="block px-3 py-2 border w-full rounded-3xl"
              onChange={handleCategoryChange}
            >
              <option value="">Select Item Type</option>
              {Object.keys(categories).map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.itemType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.itemType.message}
              </p>
            )}
          </div>

          {/* Section for Adding Specifications */}
          {selectedCategory && (
            <div className="w-full">
              <label className="block text-gray-700 font-bold mb-2">
                Add Specifications
              </label>
              <div className="flex items-center gap-2 mb-4">
                <select
                  value={specInput}
                  onChange={handleSpecInputChange}
                  className="px-3 py-2 border rounded w-1/2"
                >
                  <option value="">Select Specification</option>
                  {specifications.map((spec, index) => (
                    <option key={index} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Value"
                  value={specValueInput}
                  onChange={handleSpecValueChange}
                  className="px-3 py-2 border rounded w-1/2"
                />

                <button
                  type="button"
                  onClick={handleAddSpecification}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
              </div>

              {/* Display Added Specifications */}
              <div className="flex flex-wrap gap-2">
                {Object.keys(specificationData).map((key) => (
                  <div
                    key={key}
                    className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    {key}: {specificationData[key]}
                    <button
                      type="button"
                      onClick={() => handleRemoveSpecification(key)}
                      className="text-red-500 font-bold"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="bg-gray-600 focus:bg-black text-white px-6 py-2 rounded-3xl mt-4"
            // disabled={isLoading} // Disable the button while loading
          >
            Submit
            {/* {isLoading ? "Searching..." : "Submit"} */}
          </button>
        </form>
      </div>

      <div className="w-full my-5">
        <div className="table-auto py-5 w-full border-collapse flex items-center justify-center">
          <div className="w-full max-w-3xl p-6 rounded-3xl shadow-md bg-gray-100 mt-8">
            <h2 className="text-xl font-bold mb-4">Search Results</h2>
            {searchResults.length > 0 ? (
                <table id="content" className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 px-4 py-2">
                        S.No.
                      </th>
                      {/* <th className="border border-gray-300 px-4 py-2">Make</th> */}
                      <th className="border border-gray-300 px-4 py-2">
                        Model
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Quantity
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Price
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Rating
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Source
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Vintage
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {searchResults.map((result, index) => (
                      <tr key={result.id}>
                        <td className="border border-gray-300  px-4 py-2">
                          {index + 1}
                        </td>
                        {/* <td className="border border-gray-300 px-4 py-2">
                    {result.make}
                  </td> */}
                        <td className="border border-gray-300 px-4 py-2">
                          {result.model}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {result.quantity}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {result.price !== "N/A" ? `₹${result.price}` : ""}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {(Math.random() * 4 + 1).toFixed(1)}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <a
                            href={result.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600"
                          >
                            {result.sourceName}
                          </a>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {new Date(result.vintage).toLocaleString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                              hour12: true,
                            }
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            ):(<p className="text-center text-gray-500">
              Waiting for your search query...
            </p>)}
          </div>
        </div>

        {/* <div> */}
        {/* <h1>Search Trends</h1> */}
        {/* <ProductTrendChart searchData={searchData} /> */}
        {/* </div> */}

        <DownloadPDF
          contentId="content"
          filename="PriceBenchmarking"
          headerText="Price Benchmarking Report"
          backgroundImage="/img/report-bg.png"
          footerText={`Generated on: ${new Date().toLocaleString()}`}
        />
      </div>
    </div>
  );
}
