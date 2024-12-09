import React from "react";
import not_found from "../assets/magnifier.png"

function NotFound() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-56px)]">
        <div className="text-center flex flex-col items-center">
        <img src={not_found} alt="" className="w-36 h-36" />
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-lg mt-2">Oops! The page you're looking for does not exist.</p>
    </div>
    </div>
  );
}

export default NotFound;