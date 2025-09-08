// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Textarea } from "@/components/ui/textarea";
// import Header from "@/components/dashboard/header/header";
// import { toast } from "sonner";

// const allTimeSlots = [
//   "12:00 PM",
//   "1:00 PM",
//   "2:00 PM",
//   "3:00 PM",
//   "4:00 PM",
//   "5:00 PM",
//   "6:00 PM",
//   "7:00 PM",
//   "8:00 PM",
//   "9:00 PM",
//   "10:00 PM",
// ];

// // sections you want
// const sections = ["TODAY", "TOMORROW"];

// const Page = () => {
//   const [availableTimes, setavailableTimes] = useState<Record<string, string[]>>({});
//   const [reason, setReason] = useState("");

//   const toggleTime = (section: string, time: string) => {
//     setavailableTimes((prev) => {
//       const current = prev[section] || [];
//       return {
//         ...prev,
//         [section]: current.includes(time)
//           ? current.filter((t) => t !== time)
//           : [...current, time],
//       };
//     });
//   };

//   const saveTimes = () => {
//     if (!reason.trim()) {
//       toast.error("Please provide a reason.");
//       return;
//     }
//     toast.success("Block time updated successfully");
//     console.log("Available Times:", availableTimes);
//     console.log("Reason:", reason);
//   };

//   return (
//     <div className="space-y-6">
//       <Header
//         title="Manage Times"
//         subTitle="Select pickup times when you are NOT available."
//       />

//       <div className="flex flex-wrap gap-2">

//         {sections.map((section) => (
//           <section
//             key={section}
//             className="bg-[#0f1b0f]/60 flex-1 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow space-y-4"
//           >
//             <h2 className="text-lg font-semibold text-white">{section}</h2>

//             {allTimeSlots.map((slot) => (
//               <label
//                 key={slot}
//                 className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded transition"
//               >
//                 <Checkbox
//                   checked={availableTimes[section]?.includes(slot) || false}
//                   onCheckedChange={() => toggleTime(section, slot)}
//                 />
//                 <span className="text-white font-medium">
//                   {section} {slot}
//                 </span>
//               </label>
//             ))}
//           </section>
//         ))}
//       </div>

//       {/* Reason textarea */}
//       <div className="bg-[#0f1b0f]/60 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow space-y-2">
//         <label className="text-white font-medium">
//           Reason for unavailability
//         </label>
//         <Textarea
//           placeholder="e.g., Doctor's appointment, holiday, personal matters..."
//           className="bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-[100px] mt-4"
//           value={reason}
//           onChange={(e) => setReason(e.target.value)}
//         />
//         <div className="pt-4">
//           <Button onClick={saveTimes} className="bg-red-600 hover:bg-red-700">
//             Save Available Times
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;
'use client';

import AddTimeToday from "@/components/dashboard/addTimeToday/addTimeToday";
import AddTimeTomorrow from "@/components/dashboard/addTimeTomorrow/addTimeTomorrow";
import Header from "@/components/dashboard/header/header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";

const Page = () => {
  const [isAddTimeOpen, setIsAddTimeOpen] = useState(false);
  const [todayTimes, setTodayTimes] = useState<any[]>([]);
  const [tomorrowTimes, setTomorrowTimes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<any>(null);
  const [editedTime, setEditedTime] = useState<string>('');

  // Fetch the time slots for today and tomorrow
  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const todayResponse = await axios.get("http://localhost:5001/api/timeslot/today");
        setTodayTimes(todayResponse.data);

        const tomorrowResponse = await axios.get("http://localhost:5001/api/timeslot/tomorrow");
        setTomorrowTimes(tomorrowResponse.data);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching time slots:", error);
        setIsLoading(false);
      }
    };

    fetchTimes();
  }, []);

  // Handle Edit Button click
  const handleEditClick = (timeSlot: any) => {
    setSelectedTimeSlot(timeSlot);
    setEditedTime(timeSlot.time);
  };

  // Handle saving the edited time
  const handleSaveEditedTime = async () => {
    if (!editedTime) return;

    console.log("Edited Time:", editedTime);
    console.log("Selected Time Slot:", selectedTimeSlot);

    try {
      const result = await axios.put(`http://localhost:5001/api/timeslot/${selectedTimeSlot._id}`, { time: editedTime });
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
                        className="flex justify-between items-center cursor-pointer hover:bg-white/5 transition-all ease-in-out duration-200 p-3 rounded-md"
                      >
                        <span className="text-white">{timeSlot.time}</span>
                        <Button
                          onClick={() => handleEditClick(timeSlot)}
                          className="p-1 bg-transparent text-white border border-white/20 hover:bg-white/10 rounded-md"
                        >
                          <PencilIcon className="h-5 w-5" />
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
                          onClick={() => handleEditClick(timeSlot)}
                          className="p-1 bg-transparent text-white border border-white/20 hover:bg-white/10 rounded-md"
                        >
                          <PencilIcon className="h-5 w-5" />
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
