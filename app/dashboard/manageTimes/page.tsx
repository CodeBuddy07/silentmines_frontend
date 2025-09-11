
'use client';

import AddTimeToday from "@/components/dashboard/addTimeToday/addTimeToday";
import AddTimeTomorrow from "@/components/dashboard/addTimeTomorrow/addTimeTomorrow";
import DeleteProductModal from "@/components/dashboard/deleteProductModal/deleteProductModal";
import Header from "@/components/dashboard/header/header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axiosSecure from "@/lib/useAxiosSecure";
import {  Trash2 } from "lucide-react";
import { useEffect, useState } from "react";


const Page = () => {
  const [isAddTimeOpen, setIsAddTimeOpen] = useState(false);
  const [todayTimes, setTodayTimes] = useState<any[]>([]);
  const [tomorrowTimes, setTomorrowTimes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<any>(null);
  const [editedTime, setEditedTime] = useState<string>('');
  const [deleteModal, setDeleteModal] = useState(false);


  const handleDeleteTime = async (timeSlotId: string) => {

    const response = await axiosSecure.delete(`/timeslot/${timeSlotId}`);

    if (response.status === 201) {
      setTodayTimes(todayTimes.filter((timeSlot: any) => timeSlot._id !== timeSlotId));
      setTomorrowTimes(tomorrowTimes.filter((timeSlot: any) => timeSlot._id !== timeSlotId));
    }
  }
  // Fetch the time slots for today and tomorrow
  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const todayResponse = await axiosSecure.get("/timeslot/today");
        setTodayTimes(todayResponse.data);

        const tomorrowResponse = await axiosSecure.get("/timeslot/tomorrow");
        setTomorrowTimes(tomorrowResponse.data);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching time slots:", error);
        setIsLoading(false);
      }
    };

    fetchTimes();
  }, [handleDeleteTime]);

  // Handle saving the edited time
  const handleSaveEditedTime = async () => {
    if (!editedTime) return;

    console.log("Edited Time:", editedTime);
    console.log("Selected Time Slot:", selectedTimeSlot);

    try {
      const result = await axiosSecure.put(`/timeslot/${selectedTimeSlot._id}`, { time: editedTime });
      console.log(result);

      setSelectedTimeSlot(null);
      setEditedTime('');
    } catch (error) {
      console.error("Error updating time slot:", error);
    }
  };

  return (
    <div className='space-y-6'>
      <Header
        title="Manage Times"
        subTitle="Select pickup times when you are NOT available."
      />

      <div>
        <div className='flex items-center gap-2'>
          <Button
            className="bg-[#00A63E] cursor-pointer"
            onClick={() => setIsAddTimeOpen(true)}
          >
            Schedule Today's Available Time
          </Button>

          {/* Add Time Modal */}
          <AddTimeToday
            open={isAddTimeOpen}
            setOpen={setIsAddTimeOpen}
          />

          {/* Manage tomorrow's time */}
          <AddTimeTomorrow />
        </div>

        {/* Show Available Times */}
        <div className="flex gap-6 mt-8">
          {isLoading ? (
            <div>
              <h3 className="text-white">Today's Available Times</h3>
              <Skeleton className="h-[40px] w-full rounded-lg bg-[#363535]" />
              <h3 className="mt-6 text-white">Tomorrow's Available Times</h3>
              <Skeleton className="h-[40px] w-full rounded-lg bg-[#363535]" />
            </div>
          ) : (
            <>
              <div className="flex-1 bg-[#0f1b0f]/60 border-b border-white/10 rounded-lg">
                <h3 className="text-lg font-semibold text-white">Today's Available Times</h3>
                {todayTimes.length > 0 ? (
                  <ul className="space-y-4 mt-4">
                    {todayTimes.map((timeSlot: { _id: string; time: string }) => (
                      <li
                        key={timeSlot._id}
                        className="flex justify-between items-center hover:bg-white/5 transition-all ease-in-out duration-200 p-3 rounded-md"
                      >
                        <span className="text-white">{timeSlot.time}</span>
                        <Button
                          onClick={() => handleDeleteTime(timeSlot._id)}
                          size="icon" variant="destructive"
                          className="p-1 bg-transparent text-white border cursor-pointer border-white/20 hover:bg-white/10 rounded-md"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">No available times for today.</p>
                )}
              </div>

              <div className="flex-1 bg-[#0f1b0f]/60 border-b border-white/10 rounded-lg">
                <h3 className="text-lg font-semibold text-white">Tomorrow's Available Times</h3>
                {tomorrowTimes.length > 0 ? (
                  <ul className="space-y-4 mt-4">
                    {tomorrowTimes.map((timeSlot: { _id: string; time: string }) => (
                      <li
                        key={timeSlot._id}
                        className="flex justify-between items-center cursor-pointer hover:bg-white/5 transition-all ease-in-out duration-200 p-3 rounded-md"
                      >
                        <span className="text-white">{timeSlot.time}</span>
                        <Button
                          onClick={() => handleDeleteTime(timeSlot._id)}
                          size="icon" variant="destructive"
                          className="p-1 bg-transparent text-white border cursor-pointer border-white/20 hover:bg-white/10 rounded-md"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">No available times for tomorrow.</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <DeleteProductModal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={() => {
          if (selectedTimeSlot) {
            handleDeleteTime(selectedTimeSlot._id);
            setDeleteModal(false);
          }
        }}
        productName={'this time slot'}
      />


      {/* Edit Time Modal */}
      {selectedTimeSlot && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-black p-6 rounded-md shadow-lg w-1/3">
            <h3 className="text-xl font-semibold">Edit Time</h3>
            <div className="mt-4">
              <input
                type="text"
                className="p-2 w-full border border-gray-300 rounded-md"
                value={editedTime}
                onChange={(e) => setEditedTime(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <Button onClick={() => setSelectedTimeSlot(null)} className="bg-red-500 hover:bg-red-600 text-white">
                Cancel
              </Button>
              <Button onClick={handleSaveEditedTime} className="bg-green-600 hover:bg-green-700 text-white">
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page;
