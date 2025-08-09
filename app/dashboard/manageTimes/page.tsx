"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

const Page = () => {
    const [blockedTimes, setBlockedTimes] = useState<string[]>([]);

    const toggleTime = (time: string) => {
        setBlockedTimes((prev) =>
            prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
        );
    };

    const saveTimes = () => {
        toast.success("Block time updated successfully")
        console.log("Blocked Times:", blockedTimes);
    };

    return (
        <div className="space-y-6">
            <Header
                title="Manage Times"
                subTitle="Select pickup times when you are NOT available."
            />

            <section className="bg-[#0f1b0f]/60 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow space-y-4">
                {allTimeSlots.map((slot) => (
                    <label
                        key={slot}
                        className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded transition"
                    >
                        <Checkbox
                            checked={blockedTimes.includes(slot)}
                            onCheckedChange={() => toggleTime(slot)}
                        />
                        <span className="text-white font-medium">TODAY {slot}</span>
                    </label>
                ))}

                <div className="pt-4">
                    <Button onClick={saveTimes} className="bg-red-600 hover:bg-red-700">
                        Save Available Times 
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default Page;
