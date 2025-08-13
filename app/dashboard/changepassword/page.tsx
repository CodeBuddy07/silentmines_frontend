"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import Header from "@/components/dashboard/header/header";

export default function UpdatePasswordPage() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [show, setShow] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Password updated:", form);
    setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    setErrors({});
  };

  return (
    <div className="p-6">
      <div className=" shadow-lg rounded-2xl w-full">
        <Header title="Manage Password" subTitle="Change admin password." />

        <form onSubmit={handleSubmit} className="bg-[#0f1b0f]/60 rounded-xl shadow-lg border border-white/10 text-white space-y-6 p-4">
          {/* Old Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Old Password</label>
            <div className="relative">
              <Input
                type={show.old ? "text" : "password"}
                name="oldPassword"
                placeholder="Enter old password"
                value={form.oldPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShow((prev) => ({ ...prev, old: !prev.old }))}
                className="absolute inset-y-0 right-3 flex items-center text-white"
              >
                {show.old ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
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
                onClick={() =>
                  setShow((prev) => ({ ...prev, confirm: !prev.confirm }))
                }
                className="absolute inset-y-0 right-3 flex items-center text-white "
              >
                {show.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full bg-[#00A63E] cursor-pointer hover:bg-green-500">
            Update Password
          </Button>
        </form>
      </div>
    </div>
  );
}
