"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/dashboard/header/header";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";
import FormatDate from "@/components/dashboard/formatDate/formatDate";

const initialReviews = [
    {
        id: 1,
        name: "John Doe",
        comment: "Great product, fast delivery. Will buy again!",
        status: "pending", // "approved" | "rejected"
        imageURL:
            "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
        starCount: 4.5,
        date: "2025-03-04",
    },
    {
        id: 2,
        name: "Sarah Khan",
        comment: "Quality could be better, but overall okay.",
        status: "approved",
        imageURL:
            "https://randomuser.me/api/portraits/women/65.jpg",
        starCount: 3.5,
        date: "2025-02-28",
    },
    {
        id: 3,
        name: "Alex Smith",
        comment: "Not satisfied, item arrived damaged.",
        status: "rejected",
        imageURL:
            "https://randomuser.me/api/portraits/men/22.jpg",
        starCount: 2,
        date: "2025-01-15",
    },
];

const Page = () => {
    const [reviews, setReviews] = useState(initialReviews);

    const handleStatusChange = (id: number, newStatus: "approved" | "rejected") => {
        setReviews((prev) =>
            prev.map((review) =>
                review.id === id ? { ...review, status: newStatus } : review
            )
        );
        console.log('inside handle status change');

        toast.success("Review updated successfully")
    };

    return (
        <div className="space-y-6">
            <Header title="Manage Reviews" subTitle="Manage all your reviews." />

            <section className="bg-[#0f1b0f]/60 backdrop-blur-md border border-white/10 p-6 rounded-xl mt-6 shadow space-y-4">
                {reviews.length === 0 ? (
                    <div className="text-gray-500 text-sm">No reviews yet.</div>
                ) : (
                    reviews.map((review) => (
                        <div
                            key={review.id}
                            className="flex items-start gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0"
                        >
                            <Image
                                src={review.imageURL}
                                alt={review.name}
                                width={50}
                                height={50}
                                className="rounded-full border border-white/20 object-cover"
                            />
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-semibold text-white">{review.name}</h4>
                                    <FormatDate date={review.date} />
                                </div>
                                <div className="flex items-center gap-1 text-yellow-400">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            className={
                                                i + 1 <= Math.floor(review.starCount)
                                                    ? "fill-current"
                                                    : i + 0.5 <= review.starCount
                                                        ? "fill-current opacity-50"
                                                        : "opacity-20"
                                            }
                                        />
                                    ))}
                                    <span className="ml-1 text-xs text-gray-400">
                                        {review.starCount}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-300 mt-1">{review.comment}</p>

                                <div className="flex items-center gap-2 mt-3">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleStatusChange(review.id, "approved")}
                                        className={`${review.status === "approved"
                                            ? "border-green-500 text-white bg-[#00A63E]"
                                            : "bg-[#00A63E]"
                                            }`}
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleStatusChange(review.id, "rejected")}
                                        className={`${review.status === "rejected"
                                            ? "border-red-500 bg-red-500"
                                            : "bg-red-500"
                                            }`}
                                    >
                                        Reject
                                    </Button>
                                    <span
                                        className={`ml-auto text-xs px-2 py-1 rounded ${review.status === "approved"
                                            ? "bg-green-500/20 text-green-400"
                                            : review.status === "rejected"
                                                ? "bg-red-500/20 text-red-400"
                                                : "bg-yellow-500/20 text-yellow-400"
                                            }`}
                                    >
                                        {review.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </section>
        </div>
    );
};

export default Page;