import React from "react";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <div className="flex w-full justify-center items-center flex-col min-h-screen text-white">
      <h1 className="font-bold text-6xl mb-4">404</h1>
      <h2 className="font-bold text-3xl mb-4">Page not found</h2>
      <p className="italic text-1xl mb-3">This page do not exist.</p>
      <Link to="/" className="bg-gray-50/20 py-1 px-4 rounded">
        {" "}
        Back to Home Page
      </Link>
    </div>
  );
};
