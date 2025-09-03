"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/dashboard/header/header";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";
import FormatDate from "@/components/dashboard/formatDate/formatDate";

// Fetching reviews from backend API
const Page = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        try {
            const response = await fetch("http://localhost:5001/api/review/allreview");
            const data = await response.json();
            setReviews(data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleStatusChange = async (id: string, newStatus: "approved" | "rejected") => {
        try {
            const response = await fetch(`http://localhost:5001/api/review/approve/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error("Failed to update review status");
            }

            setReviews((prev: any) =>
                prev.map((review: any) =>
                    review._id === id ? { ...review, status: newStatus } : review
                )
            );
            toast.success("Review updated successfully");
        } catch (error) {
            console.error("Error updating review:", error);
            toast.error("Failed to update review");
        }
    };

    return (
        <div className="space-y-6">
            <Header title="Manage Reviews" subTitle="Manage all your reviews." />

            <section className="bg-[#0f1b0f]/60 backdrop-blur-md border border-white/10 p-6 rounded-xl mt-6 shadow space-y-4">
                {loading ? (
                    <div className="text-gray-500 text-sm">Loading reviews...</div>
                ) : reviews.length === 0 ? (
                    <div className="text-gray-500 text-sm">No reviews yet.</div>
                ) : (
                    reviews.map((review:any) => (
                        <div
                            key={review._id}  // Correct comment syntax here
                            className="flex items-start gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0"
                        >
                            <Image
                                src={review.imageURL || "/default-image.png"}  // Handle empty src
                                alt={review.clientName || "Reviewer's profile image"}  // Added alt text
                                width={50}
                                height={50}
                                className="rounded-full border border-white/20 object-cover"
                            />
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-semibold text-white">{review.clientName}</h4>
                                    <FormatDate date={review.date} />
                                </div>
                                <div className="flex items-center gap-1 text-yellow-400">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            className={
                                                i + 1 <= Math.floor(review.rating)
                                                    ? "fill-current"
                                                    : i + 0.5 <= review.rating
                                                        ? "fill-current opacity-50"
                                                        : "opacity-20"
                                            }
                                        />
                                    ))}
                                    <span className="ml-1 text-xs text-gray-400">
                                        {review.rating}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-300 mt-1">{review.description}</p>

                                <div className="flex items-center gap-2 mt-3">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleStatusChange(review._id, "approved")}
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
                                        onClick={() => handleStatusChange(review._id, "rejected")}
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
