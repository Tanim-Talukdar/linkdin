import React from 'react'

export default function Input({ id, label, placeholder, type = "text", icon }) {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-md font-medium text-black">{label}</label>
      <div className="relative flex items-center">
        <span className="inline-flex items-center px-3 text-sm text-black bg-gray-200 border rounded-s-md border-gray-300 absolute left-0 h-full">
          {icon}
        </span>
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className="bg-gray-50 border border-gray-300 text-black text-sm rounded-s-md block w-full ps-12 p-2.5"
        />
      </div>
    </div>
  );
}
