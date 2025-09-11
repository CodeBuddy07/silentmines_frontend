"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/dashboard/header/header";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";
import FormatDate from "@/components/dashboard/formatDate/formatDate";
import Pagination from "@/components/shared/pagination";
import axiosSecure from "@/lib/useAxiosSecure";

// Fetching reviews from backend API
const Page = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    const fetchReviews = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/review/allreview?page=${currentPage}&limit=5`);
            const data = await response.json();
            setReviews(data.reviews);
            setTotalPages(data.totalPages);
            setTotalItems(data.totalReviews);
            console.log(data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id: string, newStatus: "approved" | "rejected") => {
        try {
            const response = await axiosSecure.patch(`/review/approve/${id}`, { status: newStatus });

            if (response.status !== 200) {
                throw new Error("Failed to update review status");
            }

            // Update the review status in the state
            setReviews((prev: any) =>
                prev.map((review: any) =>
                    review._id === id ? { ...review, status: newStatus } : review
                )
            );

            fetchReviews();


            toast.success("Review deleted successfully");

            // If rejected, call the delete function
            // if (newStatus === "rejected") {
            //     await handleDeleteReview(id);
            // }
        } catch (error) {
            console.error("Error updating review:", error);
            toast.error("Failed to update review");
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [currentPage]);

    // Handle status change (Approve or Reject) 

    return (
        <div className="space-y-4 sm:space-y-6 px-3 sm:px-0">
            <Header title="Manage Reviews" subTitle="Manage all your reviews." />

            <section className="bg-[#0f1b0f]/60 backdrop-blur-md border border-white/10 p-3 sm:p-4 md:p-6 rounded-xl shadow">
                {loading ? (
                    <div className="text-gray-500 text-sm text-center py-8">
                        Loading reviews...
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="text-gray-500 text-sm text-center py-8">
                        No reviews yet.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {reviews.map((review: any) => (
                            <div
                                key={review._id}
                                className="border border-white/5 bg-white/5 rounded-lg p-3 sm:p-4 md:p-5 hover:bg-white/10 transition-colors duration-200"
                            >
                                {/* Mobile Layout */}
                                <div className="block sm:hidden space-y-3">
                                    {/* Header with image and basic info */}
                                    <div className="flex items-center gap-3">
                                        <Image
                                            src={review.imageURL || "/default-image.png"}
                                            alt={review.clientName || "Reviewer's profile image"}
                                            width={40}
                                            height={40}
                                            className="rounded-full border border-white/20 object-cover flex-shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-white truncate text-sm">{review.clientName}</h4>
                                            <div className="flex items-center gap-1 text-yellow-400">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={12}
                                                        className={
                                                            i + 1 <= Math.floor(review.rating)
                                                                ? "fill-current"
                                                                : i + 0.5 <= review.rating
                                                                    ? "fill-current opacity-50"
                                                                    : "opacity-20"
                                                        }
                                                    />
                                                ))}
                                                <span className="ml-1 text-xs text-gray-400">{review.rating}</span>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <FormatDate date={review.date} />
                                        </div>
                                    </div>

                                    {/* Review text */}
                                    <p className="text-sm text-gray-300 leading-relaxed">{review.description}</p>

                                    {/* Actions and status */}
                                    <div className="flex flex-col xs:flex-row gap-2">
                                        <div className="flex gap-2 flex-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleStatusChange(review._id, "approved")}
                                                className={`flex-1 xs:flex-none text-xs py-1.5 px-3 ${review.status === "approved"
                                                    ? "border-green-500 text-white bg-[#00A63E]"
                                                    : "bg-[#00A63E] hover:bg-[#00A63E]/80"
                                                    }`}
                                            >
                                                Approve
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleStatusChange(review._id, "rejected")}
                                                className={`flex-1 xs:flex-none text-xs py-1.5 px-3 ${review.status === "rejected"
                                                    ? "border-red-500 bg-red-500"
                                                    : "bg-red-500 hover:bg-red-500/80"
                                                    }`}
                                            >
                                                Reject
                                            </Button>
                                        </div>
                                        <span
                                            className={`text-xs px-2 py-1 rounded text-center xs:text-left capitalize ${review.status === "approved"
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

                                {/* Tablet and Desktop Layout */}
                                <div className="hidden sm:flex items-start gap-3 md:gap-4">
                                    <Image
                                        src={review.imageURL || "/default-image.png"}
                                        alt={review.clientName || "Reviewer's profile image"}
                                        width={50}
                                        height={50}
                                        className="rounded-full border border-white/20 object-cover flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        {/* Header info */}
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-semibold text-white truncate pr-2">{review.clientName}</h4>
                                            <FormatDate date={review.date} />
                                        </div>

                                        {/* Rating */}
                                        <div className="flex items-center gap-1 text-yellow-400 mb-2">
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
                                            <span className="ml-1 text-xs text-gray-400">{review.rating}</span>
                                        </div>

                                        {/* Review description */}
                                        <p className="text-sm text-gray-300 mb-3 leading-relaxed">{review.description}</p>

                                        {/* Actions row */}
                                        <div className="flex items-center gap-2 flex-wrap">
                                           {
                                            review.status === "pending" && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleStatusChange(review._id, "approved")}
                                                    className={`text-xs px-3 py-1.5 ${review.status === "approved"
                                                        ? "border-green-500 bg-[#00A63E]"
                                                        : "bg-[#00A63E] hover:bg-[#00A63E]/80"
                                                        }`}
                                                >
                                                    Approve
                                                </Button>
                                            )
                                           }
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleStatusChange(review._id, "rejected")}
                                                className={`text-xs px-3 py-1.5 ${review.status === "rejected"
                                                    ? "border-red-500 bg-red-500"
                                                    : "bg-red-500 hover:bg-red-500/80"
                                                    }`}
                                            >
                                                Reject
                                            </Button>
                                            <span
                                                className={`ml-auto text-xs px-2 py-1 rounded capitalize ${review.status === "approved"
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
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {totalPages! > 1 && reviews.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages || 0}
                    onPageChange={setCurrentPage}
                />
            )}

        </div>
    );
};

export default Page;
