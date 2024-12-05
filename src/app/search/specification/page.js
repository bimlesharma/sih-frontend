"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SpecificationSearch() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState(null); // Store the search query
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false); // Control form view
  const router = useRouter(); // Access router for navigation

  const [searchType, setSearchType] = useState(""); // Store selected search type
  const [specifications, setSpecifications] = useState([]); // Store specification tags
  const [specInput, setSpecInput] = useState(""); // Input for specifications

  // Handle search type selection and page redirection
  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    if (e.target.value) {
      router.push(`/${e.target.value}`); // Navigate to the selected search type's page
    }
  };

  const handleSpecInputChange = (e) => {
    setSpecInput(e.target.value);
  };

  const handleSpecInputKeyDown = (e) => {
    if (e.key === " " && specInput.trim()) {
      setSpecifications((prev) => [...prev, specInput.trim()]);
      setSpecInput("");
    }
  };

  const handleSpecRemove = (index) => {
    setSpecifications((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data) => {
    console.log("Specification Search Data:", { ...data, specifications });
    setSearchQuery({ ...data, specifications }); // Store query
    setIsSearchSubmitted(true); // Toggle view

    // Simulated data for output table
    const results = [
      {
        id: 1,
        make: "2020",
        model: "XYZ123",
        price: "₹10,000",
        source: "https://example.com/item1",
        vintage: "2020",
      },
      {
        id: 2,
        make: "2019",
        model: "ABC789",
        price: "₹15,500",
        source: "https://example.com/item2",
        vintage: "2019",
      },
      {
        id: 3,
        make: "2021",
        model: "LMN456",
        price: "₹12,000",
        source: "https://example.com/item3",
        vintage: "2021",
      },
    ];
    setSearchResults(results);
  };

  return (
    <div className="min-h-screen flex flex-col items-center text-sm lg:pt-14 bg-white px-4 sm:px-8 md:px-16 lg:px-0">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row w-full justify-center gap-5 py-3 bg-yellow-40 lg:px-20">
          <div className="font-bold h-10 py-6 shadow rounded-full gap-2 flex bg-gray-100 items-center w-full lg:w-auto mx-auto px-2 sm:mx-0">
            <select
              className="px-2 py-2 rounded-full font-semibold w-full lg:w-auto border"
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
            className="bg-gray-100 flex flex-col lg:flex-row shadow gap-2 items-center justify-between rounded-3xl lg:rounded-3xl px-2 py-2 lg:py-0 lg:w-auto mt-4 lg:mt-0"
          >
            <div className="w-full">
              <input
                id="itemName"
                type="text"
                placeholder="Item Name"
                {...register("itemName", { required: "Item Name is required" })}
                className="block px-3 py-2 border w-full lg:w-auto rounded-full"
              />
              {errors.itemName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.itemName.message}
                </p>
              )}
            </div>

            <div className="w-full lg:w-1/4">
              <select
                id="itemType"
                placeholder="Item Type"
                {...register("itemType", { required: "Item Type is required" })}
                className="block px-3 py-2 border w-full lg:w-auto rounded-3xl"
              >
                <option value="">Select Item Type</option>
                <option value="Electronic">Electronic</option>
                <option value="Furniture">Furniture</option>
                <option value="Machinery">Machinery</option>
              </select>
              {errors.itemType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.itemType.message}
                </p>
              )}
            </div>

            <div className="w-full lg:w-1/4">
              <div className="flex flex-wrap gap-2 w-full lg:w-auto rounded-3xl">
                <input
                  type="text"
                  placeholder="Specifications"
                  value={specInput}
                  onChange={handleSpecInputChange}
                  onKeyDown={handleSpecInputKeyDown}
                  className="outline-none flex-grow w-auto rounded-3xl px-3 py-2"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full lg:w-auto px-5 bg-gray-600 text-white py-2 rounded-full hover:bg-gray-900 mt-4 sm:mt-0"
            >
              Search
            </button>
          </form>
        </div>
        <div className="specs flex gap-1 justify-center items-center">
          <p>Specifications for search: </p>
          {specifications.map((spec, index) => (
            <span
              key={index}
              className="bg-gray-300 px-2 py-1 rounded-full flex items-center gap-1"
            >
              {spec}
              <button
                type="button"
                onClick={() => handleSpecRemove(index)}
                className="text-red-500 font-bold"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>
      <hr className="w-full border-gray-200" />
      {searchQuery && (
        <div className="my-4 text-center">
          <p>
            Showing results for: Item Name -{" "}
            <strong>{searchQuery.itemName}</strong>, Item Type -{" "}
            <strong>{searchQuery.itemType}</strong>
          </p>
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="w-full max-w-3xl bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Search Results</h2>
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Sl. No.</th>
                <th className="border border-gray-300 px-4 py-2">Make</th>
                <th className="border border-gray-300 px-4 py-2">Model</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Source</th>
                <th className="border border-gray-300 px-4 py-2">Vintage</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((result, index) => (
                <tr key={result.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {result.make}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {result.model}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {result.price}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <a
                      href={result.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Source Link
                    </a>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {result.vintage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
