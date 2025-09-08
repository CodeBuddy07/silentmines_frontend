import useAxios from "@/hooks/useAxios";
import { Announcement } from "@/types";
import { useEffect, useState } from "react";
import parse from 'html-react-parser';



export const AnnouncementSection = () => {

  const [announcement, setAnnouncement] = useState<Announcement>({} as Announcement);

  const getData = async () => {
    const res = await useAxios.get(`/announcements`);
    setAnnouncement(res.data);
  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <section className="bg-black text-white py-16 px-4 w-full border-b border-gray-700">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h2
          className="text-2xl  font-extrabold"
        >
          Today&apos;s Announcement
        </h2>

        {/* <div className="space-y-3 text-sm  font-semibold text-left mx-auto w-fit mt-10">
          <p className="text-center">DAILY SPECIALS UPDATED EVERY DAY!</p>
          <p className="text-center">NEW HEAT ALWAYS DROPPING 🔥</p>
          <p className="text-center">SUPER EXCLUSIVE SAVINGS 3–5 LB+ 🎁</p>
          <p className="text-center">❓ MYSTERY OZ FOR ONLY $50 ❓</p>
          <p className="text-center">🪙 READY TO MAKE SOME MONEY?</p>
          <p className="text-center">↗ READY TO LEVEL UP YOUR LIFE?</p>
          <p className="text-center">PAPA&apos;S TAKING THE AREA FAM TO THE MOON 🚀</p>
        </div> */}

        {parse(announcement.announcement || '' )}

      </div>
    </section>
  )
}
