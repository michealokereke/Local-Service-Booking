"use client";
import React from "react";

interface Step1Props {
  name: string;
  businessName: string;
  onChange: (field: "name" | "businessName", value: string) => void;
}

const Step1: React.FC<Step1Props> = ({ name, businessName, onChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Your full name"
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-3 shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-gray-100 transition"
          required
          autoFocus
        />
      </div>

      <div>
        <label
          htmlFor="businessName"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Business Name
        </label>
        <input
          type="text"
          id="businessName"
          value={businessName}
          onChange={(e) => onChange("businessName", e.target.value)}
          placeholder="Your business name"
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-3 shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-gray-100 transition"
          required
        />
      </div>
    </div>
  );
};

export default Step1;
