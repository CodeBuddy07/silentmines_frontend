"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

interface AddTimeModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onSave: (day: string, time: string) => void; // Save function passed as prop
}

const AddTimeModal: React.FC<AddTimeModalProps> = ({ open, setOpen, onSave }) => {
    const [day, setDay] = useState<string>("tomorrow");
    const [time, setTime] = useState<string>("14:00 AM");

    const handleSave = () => {
        onSave(day, time);
        setOpen(false); // Close modal after saving
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-black border border-black">
                <DialogHeader>
                    <DialogTitle className="text-white">Add Time</DialogTitle>
                </DialogHeader>
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
                        className="border-gray-500 bg-red-500 text-white hover:bg-red-400 hover:text-white cursor-pointer"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="bg-[#00A63E] hover:bg-green-400 cursor-pointer"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddTimeModal;