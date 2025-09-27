"use client";

// pages/login.tsx
import React, { useEffect, useState } from "react";
import Logo from "@/components/Interface/Logo";
import MultiStepForm from "@/components/auth/MultiStepForm";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Right Panel */}
      <div className="lg:flex-1 flex items-center justify-center bg-white dark:bg-gray-900 p-8 sm:p-16 transition-colors duration-700">
        <div className="w-full flex flex-col items-center max-w-md shadow-2xl rounded-2xl overflow-hidden bg-white dark:bg-gray-900 p-8">
          <Logo className="mb-2" size={80} />
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-extrabold text-secondary">
              Local Service Booking
            </h2>
            <h2 className="text-3xl mt-3 font-extrabold text-gray-900 dark:text-gray-100">
              Create Account
            </h2>
          </div>
          <MultiStepForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

// {/*
//  <div className="relative hidden lg:flex-1 lg:flex flex-col justify-center items-center bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 text-white p-10 overflow-hidden">
//   {/* Overlay gradient shape */}
//   <div
//     aria-hidden="true"
//     className="absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full bg-purple-400 opacity-30 blur-3xl animate-blob"
//   />
//   <div
//     aria-hidden="true"
//     className="absolute bottom-[-80px] right-[-80px] w-[300px] h-[300px] rounded-full bg-pink-400 opacity-30 blur-2xl animate-blob animation-delay-2000"
//   />

//   <Logo className="mb-8" />
//   <h1 className="text-4xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
//     Local Service Booking
//   </h1>
//   <p className="max-w-sm text-lg font-light drop-shadow-md text-indigo-100">
//     A seamless online booking portal for local businesses.
//     <br />
//     Manage appointments, payments, and confirmations with ease.
//   </p>
// </div>

// */}
