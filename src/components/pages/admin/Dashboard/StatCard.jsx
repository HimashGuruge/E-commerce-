// StatCard.jsx
import React from "react";

export default function StatCard({ icon, title, value, color }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 flex items-center space-x-4">
      <div className={`p-3 rounded-full bg-opacity-10 ${color.replace("text-", "bg-")}`}>
        {React.cloneElement(icon, { className: color })}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
