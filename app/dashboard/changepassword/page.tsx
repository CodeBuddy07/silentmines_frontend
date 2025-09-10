"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import Header from "@/components/dashboard/header/header";
import axios from "axios";
import { toast } from "sonner";
import { baseUrl } from "@/lib/useAxiosSecure";

export default function UpdatePasswordPage() {
  const [form, setForm] = useState({
    email: "admin@example.com",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [show, setShow] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Check if the new password and confirm password match
    if (form.newPassword !== form.confirmPassword) {
      // setErrors({ c= onfirmPassword: "Passwords do not match." });
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        `${baseUrl}/admin/forgot-password`,
        {
          email: form.email,
          newPassword: form.newPassword,
        }
      );

      // Check for success response
      if (response.status === 200) {
        // setSuccessMessage("Password updated successfully.");
        toast.success("Password updated successfully.");
      } else {
        // setErrorMessage(response.data.message || "An error occurred while updating the password.");
        toast.error(
          response.data.message || "An error occurred while updating the password."
        );
      }
    } catch (error: any) {
      // setErrorMessage(error.response?.data?.message || "Failed to connect to the server.");
      toast.error(error.response?.data?.message || "Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="shadow-lg rounded-2xl w-full">
        <Header title="Manage Password" subTitle="Change admin password." />

        <form
          onSubmit={handleSubmit}
          className="bg-[#0f1b0f]/60 rounded-xl shadow-lg border border-white/10 text-white space-y-6 p-4"
        >
          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <div className="relative">
              <Input
                className="cursor-not-allowed"
                type="email"
                name="email"
                placeholder="Enter Email Address"
                value={form.email}
                readOnly={true}
              />
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <div className="relative">
              <Input
                type={show.new ? "text" : "password"}
                name="newPassword"
                placeholder="Enter new password"
                value={form.newPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShow((prev) => ({ ...prev, new: !prev.new }))}
                className="absolute inset-y-0 right-3 flex items-center text-white"
              >
                {show.new ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <div className="relative">
              <Input
                type={show.confirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm new password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShow((prev) => ({ ...prev, confirm: !prev.confirm }))}
                className="absolute inset-y-0 right-3 flex items-center text-white"
              >
                {show.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-[#00A63E] cursor-pointer hover:bg-green-500">
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>

        {/* Success and Error Messages */}
        {/* {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>} */}
      </div>
    </div>
  );
}
