'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import axiosSecure from '@/lib/useAxiosSecure';

interface AddTimeTomorrowProps {
    onSuccess?: () => void;
}

const AddTimeTomorrow: React.FC<AddTimeTomorrowProps> = ({ onSuccess }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [day] = useState('tomorrow');
    const [time, setTime] = useState('07:00 AM');
    const [isLoading, setIsLoading] = useState(false);

    const handleSaveTime = async () => {
        try {
            setIsLoading(true);
            const response = await axiosSecure.post(`/timeslot/add`, { day, time });

            if (response.status === 201) {
                toast.success('Tomorrow time slot added successfully!');
                setTime('07:00 AM');
                setIsModalOpen(false);
                onSuccess?.();
            } else {
                toast.error('Failed to add tomorrow time slot');
            }
        } catch (err: any) {
            console.log('Error:', err.response || err.message || err);
            toast.error('Failed to add time slot');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Button onClick={() => setIsModalOpen(true)} className="bg-green-600 text-white hover:bg-green-700">
                Add Time for Tomorrow
            </Button>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="bg-black text-white border border-white/10">
                    <DialogHeader>
                        <DialogTitle>Add Time for Tomorrow</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-3">
                        <Input
                            className="text-white cursor-not-allowed"
                            placeholder="Day"
                            value={day}
                            readOnly
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
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="bg-[#00A63E] hover:bg-green-400"
                            onClick={handleSaveTime}
                            disabled={isLoading}
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddTimeTomorrow;
