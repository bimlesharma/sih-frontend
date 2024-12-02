"use client";
import { useForm } from "react-hook-form";

export default function ServiceSearch() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Service Search Data:", data);
    alert(`Searching for service: ${data.service}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-6 rounded shadow-md"
      >
        <h1 className="text-2xl font-bold mb-4">Service Search</h1>
        <div className="mb-4">
          <label htmlFor="service" className="block text-sm font-medium">
            Enter Service Name
          </label>
          <input
            id="service"
            type="text"
            {...register("service", { required: "Service name is required" })}
            className="mt-1 block w-full px-3 py-2 border rounded"
          />
          {errors.service && (
            <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
        >
          Search
        </button>
      </form>
    </div>
  );
}
