"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import Header from "@/components/dashboard/header/header";
import { toast } from "sonner";
import axiosSecure from "@/lib/useAxiosSecure";

function getEmailFromToken(): string {
  try {
    const token = localStorage.getItem("token");
    if (!token) return "";
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.email || payload.sub || "";
  } catch {
    return "";
  }
}

export default function UpdatePasswordPage() {
  const [form, setForm] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const email = getEmailFromToken();
    if (email) {
      setForm((prev) => ({ ...prev, email }));
    }
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.email) {
      toast.error("Admin email could not be determined. Please log in again.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (form.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosSecure.post(`/admin/forgot-password`, {
        email: form.email,
        newPassword: form.newPassword,
      });

      if (response.status === 200) {
        toast.success("Password updated successfully.");
        setForm((prev) => ({ ...prev, newPassword: "", confirmPassword: "" }));
      } else {
        toast.error(
          response.data.message || "An error occurred while updating the password."
        );
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to connect to the server."
      );
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
