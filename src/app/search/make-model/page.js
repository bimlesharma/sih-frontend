"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import cors from "cors";

export default function MakeModelSearch() {
  cors();
  let resData = {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState(null);
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [categories, setCategories] = useState({});
  const [specifications, setSpecifications] = useState([]);
  const [searchType, setSearchType] = useState("");

  const router = useRouter();
  const pathname = usePathname();

  // Fetch the category_specs.json file
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

  useEffect(() => {
    const pathSegments = pathname.split("/");
    const currentType = pathSegments[pathSegments.length - 1];
    if (["make-model", "specification", "service"].includes(currentType)) {
      setSearchType(`search/${currentType}`);
    } else {
      setSearchType("");
    }
  }, [pathname]);

  const handleSearchTypeChange = (e) => {
    const selectedType = e.target.value;
    setSearchType(selectedType);
    if (selectedType) {
      router.push(`/${selectedType}`);
    }
  };

  const onSubmit = async (data) => {
    console.log("Make/Model Search Data:", data);

    try {
      const response = await axios.get(
        "http://192.168.155.164:3001/api/search/make-model",
        {
          params: {
            name: data.itemName,
            type: data.itemType,
            make: data.make,



            model: data.model,
          },
        }
      );
      const resData = response.data;
      console.log("Response Data:", resData);

      // Transform the response data into a usable format
      const arr = resData.products.map((product, index) => ({
        id: index + 1,
        name: product.name,
        make: product.make,
        model: product.model,
        price: product.currentPrice || "N/A", // Add price if available
        source: product.sources?.[0]?.link || "N/A",
        sourceName: product.sources?.[0]?.sourceName || "N/A",
        lastUpdated: product.sources?.[0]?.lastUpdated || "N/A",
      }));

      // Update the state with search results
      setSearchResults(arr);
      setSearchQuery(data); // Save search query for display
    } catch (error) {
      console.error("Failed to search:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-sm sm:px-8 md:px-16 lg:pt-14 pt-20 ">
      {/* <hr className="w-full border-gray-200" /> */}
      <div className="w-1/2">
        <div className="flex w-full flex-col  gap-5 py-3 bg-yellow-40 lg:px-20">
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

          {/* Search Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-gray-100 flex flex-col w-full shadow gap-2 items-center justify-between rounded-3xl px-2 py-2 lg:mt-0"
          >
            <div className="w-full">
              <input
                id="itemName"
                type="text"
                placeholder="Item Name"
                {...register("itemName", { required: "Item Name is required" })}
                className="block px-3 py-2 border w-full   rounded-full"
              />
              {errors.itemName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.itemName.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <select
                id="itemType"
                {...register("itemType", { required: "Item Type is required" })}
                className="block px-3 py-2 border w-full rounded-full"
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

            <div className="w-full   ">
              <input
                id="make"
                type="text"
                placeholder="Make (Company)"
                {...register("make", { required: "Make is required" })}
                className="block px-3 py-2 border w-full   rounded-full"
              />
              {errors.make && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.make.message}
                </p>
              )}
            </div>

            <div className="w-full   ">
              <input
                id="model"
                type="text"
                placeholder="Model (Model No.)"
                {...register("model", { required: "Model is required" })}
                className="block px-3 py-2 border w-full   rounded-full"
              />
              {errors.model && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.model.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full   px-5 bg-gray-600 text-white py-2 rounded-full hover:bg-gray-900 mt-4 sm:mt-0"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      {/* <hr className="w-full border-gray-200" /> */}
      {searchQuery && (
        <div className="my-4 text-center">
          <h1>
            <p>Showing results for:</p>
            Item Name - <strong>{searchQuery.itemName}</strong>, Item Type -{" "}
            <strong>{searchQuery.itemType}</strong>, Make -{" "}
            <strong>{searchQuery.make}</strong>, Model -{" "}
            <strong>{searchQuery.model}</strong>
          </h1>
        </div>
      )}
      <div className="w-full my-5">
        <div className="table-auto py-5 w-full border-collapse flex items-center justify-center">
          <div className="w-full max-w-3xl p-6 rounded-3xl shadow-md bg-gray-100">
            <h2 className="text-xl font-bold mb-4">Search Results</h2>
            {searchResults.length > 0 ? (
              <table className="table-auto w-full border-collapse bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">S.No.</th>
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Make</th>
                    <th className="border border-gray-300 px-4 py-2">Model</th>
                    <th className="border border-gray-300 px-4 py-2">Price</th>
                    <th className="border border-gray-300 px-4 py-2">Source</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Last Updated
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((result) => (
                    <tr key={result.id} className="text-center">
                      <td className="border border-gray-300 px-4 py-2">
                        {result.id}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {result.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {result.make}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {result.model}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {result.price !== "N/A" ? `₹${result.price}` : ""}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <a
                          href={result.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {result.sourceName}
                        </a>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {new Date(result.lastUpdated).toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: true,
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500">
                No results found. Please try another search.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
