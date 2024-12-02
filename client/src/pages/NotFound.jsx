import React from "react";

function NotFound() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-56px)]">
        <div className="text-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-lg mt-2">Oops! The page you're looking for does not exist.</p>
    </div>
    </div>
  );
}

export default NotFound;