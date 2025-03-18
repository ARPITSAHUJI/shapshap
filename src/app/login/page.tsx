"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Heading from "@/components/Utils/Heading";
import { useLoginMutation } from "@/store/actions/auth/authApi";

const Login = () => {
  const router = useRouter();
  const [login, { isSuccess, isLoading, error }] = useLoginMutation();

  // Form Validation Schema
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Formik Hook
  const formik = useFormik({
    initialValues: {
      username: "+2348130046340",
      password: "123456",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await login({
          ...values,
          client_id: 20,
          client_secret: "U1eB99o76s7JSg7EizYIj2gdtKERnRr8tPwBk2wRG2DIDLRV8C",
          grant_type: "password",
        }).unwrap();
      } catch (err) {
        console.error("Login failed", err);
      }
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successful!");
      router.push("/dashboard");
    }
    if (error && "data" in error) {
      const errorMessage =
        (error as FetchBaseQueryError & { data: { message?: string } }).data
          ?.message || "An unexpected error occurred.";
      console.log(errorMessage);
      toast.error(errorMessage);
    }
  }, [isSuccess, error, router]);

  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-screen bg-[#F8F8FB]">
      {/* Meta Data */}
      <Heading
        title="Login"
        description="Login page"
        keywords="Login, Merchant, AI, ML"
      />
      <div className="w-full max-w-md bg-white shadow-sm rounded-sm overflow-hidden">
        <div className="mb-6 flex justify-between bg-[#D4DBF9] px-4">
          <div>
            <h2 className="text-lg font-semibold mt-4 text-[#556EE6]">
              Welcome Back!
            </h2>
            <p className="text-[#485EC4] text-sm mt-1">
              Sign in to continue to Shapshap.
            </p>
          </div>
          <Image
            src="/profile-img.png"
            height={90}
            width={170}
            alt="Logo"
            className="w-auto h-auto"
            priority
          />
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-4 m-8 text-sm text-gray-900"
        >
          {error && (
            <p className="text-red-500 text-sm">
              {("data" in error &&
                (error as FetchBaseQueryError & { data: { message?: string } })
                  .data?.message) ||
                "Login failed."}
            </p>
          )}

          <div>
            <label className="block text-gray-700 pb-2">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              {...formik.getFieldProps("username")}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                formik.touched.username && formik.errors.username
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.username}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 pb-2">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              {...formik.getFieldProps("password")}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#485EC4] hover:bg-blue-600 text-white py-2 rounded-md transition duration-200"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
