"use client";

import React from "react";
import CurrencySelect from "./CurrencySelect";

interface Step3Props {
  role: string;
  currency: string;
  onChange: (field: "role" | "currency", value: string) => void;
}

const Step3: React.FC<Step3Props> = ({ role, currency, onChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Role (Optional)
        </label>
        <input
          type="text"
          id="role"
          value={role}
          disabled
          onChange={(e) => onChange("role", e.target.value)}
          placeholder="E.g. Owner, Manager, Staff"
          className="mt-1 block w-full rounded-md border cursor-not-allowed border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-3 shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-gray-100 transition"
        />
      </div>

      <div>
        <label
          htmlFor="currency"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Currency
        </label>

        <CurrencySelect
          value={currency}
          onChange={(val) => onChange("currency", val)}
        />
      </div>
    </div>
  );
};

export default Step3;
