'use client';
import React, { JSX, useEffect, useState } from 'react';
import { Star, User, Calendar, Plus, X } from 'lucide-react';
import useAxios from '@/hooks/useAxios';
import { Review } from '@/types';
import { toast } from 'sonner';
import Pagination from '@/components/shared/pagination';
import Image from 'next/image'; // Import Next.js Image component

interface ReviewFormData {
  name: string;
  rating: number;
  review: string;
  image?: File | null;
}

const ReviewsPage: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ReviewFormData>({
    name: '',
    rating: 0,
    review: '',
    image: null
  });
  const [reviews, setReviews] = useState<Review[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const getData = async () => {
    const res = await useAxios.get(`/review/approvedreview?page=${currentPage}&limit=${itemsPerPage}`);
    setReviews(res.data.approvedReviews);
    console.log(res);
    setTotalPages(res.data.totalPages);
    setTotalItems(res.data.approvedReviews.length);
  };

  useEffect(() => {
    getData();
  }, [currentPage, itemsPerPage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      image: file
    }));
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      rating: 0,
      review: '',
      image: null
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('clientName', formData.name);
      formDataToSend.append('rating', formData.rating.toString());
      formDataToSend.append('description', formData.review);
      formDataToSend.append('date', new Date().toISOString());

      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await useAxios.post('/review/submit', formDataToSend);

      console.log(response);

      if (response.status !== 201) {
        throw new Error('Failed to submit review');
      }

      getData();
      setIsDialogOpen(false);
      resetForm();
      toast.success('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error((error as any).response?.data?.message || 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number): JSX.Element[] => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-5 h-5 ${i <= rating
            ? 'fill-green-500 text-green-500'
            : 'fill-gray-600 text-gray-600'
            }`}
        />
      );
    }
    return stars;
  };

  const getAverageRating = (): number => {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round((totalRating / reviews.length) * 10) / 10;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            Customer Reviews
          </h1>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              {renderStars(Math.round(getAverageRating() || 0))}
            </div>
            <span className="text-2xl font-semibold text-green-400">
              {getAverageRating() || 0}
            </span>
            <span className="text-gray-400">
              ({totalItems} reviews)
            </span>
          </div>
          <p className="text-gray-400 text-lg">
            What our customers are saying about us
          </p>
        </div>

        {/* Write Review Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setIsDialogOpen(true)}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 flex items-center gap-2 mx-auto"
          >
            <Plus className="w-5 h-5" />
            Write a Review
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid gap-6 md:gap-8">
          {reviews?.map((review) => (
            <div
              key={review._id}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10"
            >
              {/* Review Header */}
              <div className="flex items-start gap-4 mb-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {review.image ? (
                    <Image
                      src={review.image}
                      alt={review.clientName}
                      width={48}
                      height={48}
                      className="rounded-full object-cover ring-2 ring-green-500/20"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>

                {/* Name and Rating */}
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg text-white mb-1">
                    {review.clientName}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm text-gray-400">
                      {review.rating}/5
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(review.date)}</span>
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <div className="mt-4">
                <p className="text-gray-300 leading-relaxed text-base">
                  {review.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {totalPages! > 1 && reviews.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages || 0}
            onPageChange={setCurrentPage}
          />
        )}

        {/* Review Dialog */}
        {isDialogOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center p-4 z-10">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700 max-h-[90vh] overflow-y-auto">
              {/* Dialog Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Write a Review</h2>
                <button
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Rating Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Rating *
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingClick(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${star <= formData.rating
                            ? 'fill-green-500 text-green-500'
                            : 'fill-gray-600 text-gray-600 hover:text-green-400'
                            }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Review Field */}
                <div>
                  <label htmlFor="review" className="block text-sm font-medium text-gray-300 mb-1">
                    Review *
                  </label>
                  <textarea
                    id="review"
                    name="review"
                    value={formData.review}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    placeholder="Share your experience..."
                  />
                </div>

                {/* Image Upload Field */}
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-1">
                    Profile Image (Optional)
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {formData.image && (
                    <p className="text-sm text-green-400 mt-1">
                      Selected: {formData.image.name}
                    </p>
                  )}
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDialogOpen(false);
                      resetForm();
                    }}
                    className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.review || formData.rating === 0}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
