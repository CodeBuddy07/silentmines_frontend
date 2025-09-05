'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import axios from "axios";  // Import axios
import { baseUrl } from "@/app/dashboard/page";
import { toast } from "sonner";

interface AddTimeModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
   
}

const AddTimeModal: React.FC<AddTimeModalProps> = ({ open, setOpen }) => {
    const [day, setDay] = useState<string>("today");
    const [time, setTime] = useState<string>("14:00 AM");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSave = async () => {
        try {
            const response = await axios.post(`${baseUrl}/timeslot/add`, {
                day,
                time
            });

            if (response.status === 201) {
                toast.success('Today time slot added successfully!');
            } else {
                toast.error('Failed to add today time slot');
            }
        } catch (err: any) {
            console.log('Error:', err.response || err.message || err);
        }
    };



    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-black text-white border border-white/10 z-50">
                <DialogHeader>
                    <DialogTitle>Add Time</DialogTitle>
                </DialogHeader>

                {/* Display error message if any */}
                {error && <p className="text-red-500">{error}</p>}

                <div className="space-y-3">
                    <Input
                        className="text-white"
                        placeholder="Day"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                    />
                    <Input
                        className="text-white"
                        placeholder="Time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>

                <DialogFooter className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        className="border-gray-500 bg-red-500 text-white hover:bg-red-400 hover:text-white"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>

                    {/* Show loading state on save button */}
                    <Button
                        className="bg-[#00A63E] hover:bg-green-400"
                        onClick={handleSave}
                        disabled={isLoading}  // Disable the button while loading
                    >
                        {isLoading ? "Saving..." : "Save"}  {/* Show loading text */}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddTimeModal;
