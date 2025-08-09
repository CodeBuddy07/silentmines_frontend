import React from 'react';
import { Star, User, Calendar } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  rating: number;
  review: string;
  date: string;
  image?: string;
}

const ReviewsPage: React.FC = () => {
  // Sample reviews data - replace with your actual data from MongoDB
  const reviews: Review[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      rating: 5,
      review: 'Absolutely amazing service! The team went above and beyond to meet our requirements. The attention to detail was exceptional, and the final product exceeded all expectations. Would definitely recommend to anyone looking for quality work.',
      date: '2024-08-05',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c1?w=64&h=64&fit=crop&crop=face&auto=format'
    },
    {
      id: '2',
      name: 'Michael Chen',
      rating: 4,
      review: 'Great experience overall. The project was delivered on time and the communication throughout was excellent. Minor issues were quickly resolved. Very professional team.',
      date: '2024-08-03',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face&auto=format'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      rating: 5,
      review: 'Outstanding work! The level of creativity and technical expertise demonstrated was impressive. They understood our vision perfectly and brought it to life beautifully.',
      date: '2024-07-28',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face&auto=format'
    },
    {
      id: '4',
      name: 'David Thompson',
      rating: 4,
      review: 'Solid performance and reliable delivery. The team was responsive to feedback and made necessary adjustments promptly. Good value for money.',
      date: '2024-07-25',
    },
    {
      id: '5',
      name: 'Lisa Wang',
      rating: 5,
      review: 'Exceptional quality and service! From start to finish, everything was handled professionally. The end result was exactly what we hoped for and more. Highly recommended!',
      date: '2024-07-20',
      image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=64&h=64&fit=crop&crop=face&auto=format'
    },
    {
      id: '6',
      name: 'James Wilson',
      rating: 3,
      review: 'Good service with room for improvement. The project was completed satisfactorily, though there were some delays. Communication could have been better.',
      date: '2024-07-15',
    }
  ];

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-5 h-5 ${
            i <= rating 
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
              {renderStars(Math.round(getAverageRating()))}
            </div>
            <span className="text-2xl font-semibold text-green-400">
              {getAverageRating()}
            </span>
            <span className="text-gray-400">
              ({reviews.length} reviews)
            </span>
          </div>
          <p className="text-gray-400 text-lg">
            What our customers are saying about us
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid gap-6 md:gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10"
            >
              {/* Review Header */}
              <div className="flex items-start gap-4 mb-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {review.image ? (
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-green-500/20"
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
                    {review.name}
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
                  {review.review}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button (Optional) */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/25">
            Load More Reviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;