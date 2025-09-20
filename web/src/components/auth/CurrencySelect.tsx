"use client";

import React from "react";
import { currencies } from "@/utils/currencies";

interface CurrencySelectProps {
  value: string;
  onChange: (val: string) => void;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({ value, onChange }) => {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full appearance-none bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 pr-8 text-gray-700 dark:text-gray-300  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        {currencies.map((curr, i) => (
          <option key={i} value={curr.code}>
            {curr.symbol} ({curr.code}) {curr.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400 dark:text-gray-500">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default CurrencySelect;
