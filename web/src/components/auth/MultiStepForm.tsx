"use client";

import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const steps = ["Basic Info", "Account Security", "Additional Info"];

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "owner",
    currency: "USD",
  });

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return (
          formData.name.trim() !== "" && formData.businessName.trim() !== ""
        );
      case 1:
        return (
          /\S+@\S+\.\S+/.test(formData.email) &&
          formData.password.length >= 8 &&
          formData.password === formData.confirmPassword
        );
      case 2:
        // role optional, currency always selected
        return true;
      default:
        return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStepValid()) return;

    if (currentStep === steps.length - 1) {
      alert("Form submitted! Data: " + JSON.stringify(formData, null, 2));
    } else {
      nextStep();
    }
  };

  return (
    <div className="max-w-md w-full p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg transition-colors duration-500">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        {steps[currentStep]}
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="overflow-hidden relative min-h-[280px]">
          {/* Animated slide container */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentStep * 100}%)` }}
          >
            <div className="w-full flex-shrink-0 pr-4">
              <Step1
                name={formData.name}
                businessName={formData.businessName}
                onChange={(field, val) => updateField(field, val)}
              />
            </div>
            <div className="w-full flex-shrink-0 px-4">
              <Step2
                email={formData.email}
                password={formData.password}
                confirmPassword={formData.confirmPassword}
                onChange={(field, val) => updateField(field, val)}
              />
            </div>
            <div className="w-full flex-shrink-0 pl-4">
              <Step3
                role={formData.role}
                currency={formData.currency}
                onChange={(field, val) => updateField(field, val)}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          <button
            type="submit"
            disabled={!isStepValid()}
            className={`px-6 py-2 rounded-md text-white transition ${
              isStepValid()
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-indigo-300 cursor-not-allowed"
            }`}
          >
            {currentStep === steps.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;

// import React, { useState } from "react";

// const currencies = [
//   "USD",
//   "EUR",
//   "GBP",
//   "JPY",
//   "CNY",
//   "AUD",
//   "CAD",
//   "CHF",
//   "INR",
//   "BRL",
//   "ZAR",
//   "SEK",
//   "NZD",
//   "SGD",
//   "HKD",
//   "KRW",
//   "MXN",
//   "NGN",
//   "RUB",
//   "TRY",
// ];

// type FormData = {
//   name: string;
//   businessName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   role: string;
//   currency: string;
// };

// export const MultiStepForm: React.FC = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     businessName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "Business Owner",
//     currency: "USD",
//   });

//   // Form validation can be expanded here
//   const canProceedStep1 =
//     formData.name.trim() !== "" && formData.email.trim() !== "";
//   const canProceedStep2 =
//     formData.password.length >= 8 &&
//     formData.password === formData.confirmPassword;

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const onNext = () => {
//     if (step === 1 && canProceedStep1) {
//       setStep(2);
//     }
//   };

//   const onPrev = () => {
//     if (step === 2) {
//       setStep(1);
//     }
//   };

//   const onSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (canProceedStep2) {
//       // Submit logic here
//       alert("Form submitted successfully!");
//     }
//   };

//   return (
//     <form
//       onSubmit={onSubmit}
//       className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-4xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-10 transition-colors duration-500"
//     >
//       {/* Left - Form Content */}
//       <div className="flex flex-col justify-center">
//         <h2 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-6 select-none">
//           {step === 1 ? "Welcome! Let's get started." : "Secure your account"}
//         </h2>
//         {step === 1 && (
//           <>
//             <label className="block mb-4">
//               <span className="text-gray-700 dark:text-gray-300 font-semibold">
//                 Name
//               </span>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Your full name"
//                 className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-4 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//             </label>
//             <label className="block mb-4">
//               <span className="text-gray-700 dark:text-gray-300 font-semibold">
//                 Business Name
//               </span>
//               <input
//                 type="text"
//                 name="businessName"
//                 placeholder="Your business name"
//                 className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-4 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
//                 value={formData.businessName}
//                 onChange={handleChange}
//               />
//             </label>
//             <label className="block mb-4">
//               <span className="text-gray-700 dark:text-gray-300 font-semibold">
//                 Email
//               </span>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="you@example.com"
//                 className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-4 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </label>
//             <button
//               type="button"
//               disabled={!canProceedStep1}
//               onClick={onNext}
//               className={`w-full mt-6 py-3 font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed transition`}
//             >
//               Next
//             </button>
//           </>
//         )}

//         {step === 2 && (
//           <>
//             <label className="block mb-4">
//               <span className="text-gray-700 dark:text-gray-300 font-semibold">
//                 Password
//               </span>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="At least 8 characters"
//                 className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-4 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 minLength={8}
//               />
//             </label>
//             <label className="block mb-4">
//               <span className="text-gray-700 dark:text-gray-300 font-semibold">
//                 Confirm Password
//               </span>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 placeholder="Re-enter password"
//                 className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-4 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 required
//               />
//               {formData.confirmPassword &&
//                 formData.password !== formData.confirmPassword && (
//                   <p className="text-red-600 text-sm mt-1">
//                     Passwords do not match
//                   </p>
//                 )}
//             </label>

//             <label className="block mb-4">
//               <span className="text-gray-700 dark:text-gray-300 font-semibold">
//                 Role (optional)
//               </span>
//               <input
//                 type="text"
//                 name="role"
//                 value={formData.role}
//                 disabled
//                 className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed px-4 py-2"
//               />
//             </label>

//             <label className="block mb-6">
//               <span className="text-gray-700 dark:text-gray-300 font-semibold">
//                 Preferred Currency
//               </span>
//               <select
//                 name="currency"
//                 value={formData.currency}
//                 onChange={handleChange}
//                 className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-4 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
//               >
//                 {currencies.map((cur) => (
//                   <option key={cur} value={cur}>
//                     {cur}
//                   </option>
//                 ))}
//               </select>
//             </label>

//             <div className="flex justify-between gap-4">
//               <button
//                 type="button"
//                 onClick={onPrev}
//                 className="flex-1 py-3 font-semibold rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900 focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-400 transition"
//               >
//                 Back
//               </button>
//               <button
//                 type="submit"
//                 disabled={!canProceedStep2}
//                 className="flex-1 py-3 font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-indigo-400 transition"
//               >
//                 Submit
//               </button>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Right - Illustration & Branding */}
//       <div className="hidden lg:flex flex-col items-center justify-center p-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white select-none shadow-xl animate-fadeIn">
//         <h3 className="text-3xl font-extrabold mb-4">Local Service Booking</h3>
//         <p className="mb-6 max-w-xs text-center font-light leading-relaxed opacity-90">
//           Streamline your local business bookings with our seamless portal.
//           Manage, confirm, and accept payments effortlessly.
//         </p>
//         <svg
//           className="w-32 h-32 opacity-90"
//           viewBox="0 0 64 64"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <circle cx="32" cy="32" r="30" stroke="white" strokeWidth="2" />
//           <path
//             d="M32 16v16l12 8"
//             stroke="white"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//       </div>
//     </form>
//   );
// };
