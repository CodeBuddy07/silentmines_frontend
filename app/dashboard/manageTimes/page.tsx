"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/dashboard/header/header";
import { toast } from "sonner";

const allTimeSlots = [
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
  "10:00 PM",
];

// sections you want
const sections = ["TODAY", "TOMORROW"];

const Page = () => {
  const [availableTimes, setavailableTimes] = useState<Record<string, string[]>>({});
  const [reason, setReason] = useState("");

  const toggleTime = (section: string, time: string) => {
    setavailableTimes((prev) => {
      const current = prev[section] || [];
      return {
        ...prev,
        [section]: current.includes(time)
          ? current.filter((t) => t !== time)
          : [...current, time],
      };
    });
  };

  const saveTimes = () => {
    if (!reason.trim()) {
      toast.error("Please provide a reason.");
      return;
    }
    toast.success("Block time updated successfully");
    console.log("Available Times:", availableTimes);
    console.log("Reason:", reason);
  };

  return (
    <div className="space-y-6">
      <Header
        title="Manage Times"
        subTitle="Select pickup times when you are NOT available."
      />

      <div className="flex flex-wrap gap-2">

        {sections.map((section) => (
          <section
            key={section}
            className="bg-[#0f1b0f]/60 flex-1 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow space-y-4"
          >
            <h2 className="text-lg font-semibold text-white">{section}</h2>

            {allTimeSlots.map((slot) => (
              <label
                key={slot}
                className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded transition"
              >
                <Checkbox
                  checked={availableTimes[section]?.includes(slot) || false}
                  onCheckedChange={() => toggleTime(section, slot)}
                />
                <span className="text-white font-medium">
                  {section} {slot}
                </span>
              </label>
            ))}
          </section>
        ))}
      </div>

      {/* Reason textarea */}
      <div className="bg-[#0f1b0f]/60 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow space-y-2">
        <label className="text-white font-medium">
          Reason for unavailability
        </label>
        <Textarea
          placeholder="e.g., Doctor's appointment, holiday, personal matters..."
          className="bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-[100px] mt-4"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="pt-4">
          <Button onClick={saveTimes} className="bg-red-600 hover:bg-red-700">
            Save Available Times
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
