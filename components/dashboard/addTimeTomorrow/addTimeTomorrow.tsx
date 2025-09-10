import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import axios from 'axios';
import { baseUrl } from '@/lib/useAxiosSecure';

// Modal Component
const AddTimeTomorrow = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [day, setDay] = useState('tomorrow');
    const [time, setTime] = useState('07:00 AM');

    const handleSaveTime = async (day: string, time: string) => {
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
        <div>
            <div>
                <Button onClick={() => setIsModalOpen(true)} className="bg-green-600 text-white hover:bg-green-700">
                    Add Time for Tomorrow
                </Button>
            </div>

            {/* Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="bg-black text-white border border-white/10">
                    <DialogHeader>
                        <DialogTitle>Add Time for Tomorrow</DialogTitle>
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
                            className="border-gray-500 bg-red-500 text-white hover:bg-red-400 hover:text-white"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="bg-[#00A63E] hover:bg-green-400"
                            onClick={() => {
                                handleSaveTime(day, time);
                                setIsModalOpen(false);
                            }}
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddTimeTomorrow;