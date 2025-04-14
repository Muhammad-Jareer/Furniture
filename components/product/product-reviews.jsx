"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, ThumbsUp, Flag } from "lucide-react"
import toast from "react-hot-toast"

export default function ProductReviews({ productId, rating, reviewCount }) {
  const [helpfulReviews, setHelpfulReviews] = useState([])
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewFormData, setReviewFormData] = useState({
    rating: 5,
    title: "",
    review: "",
    name: "",
    email: "",
  })

  // Mock reviews data - in a real app, this would come from an API
  const reviews = [
    {
      id: 1,
      author: "Sarah Johnson",
      date: "August 15, 2023",
      rating: 5,
      title: "Absolutely Beautiful and Comfortable",
      review:
        "I've been looking for the perfect sofa for months, and I'm so glad I found this one. The craftsmanship is exceptional, and it's even more comfortable than I expected. The natural wood finish is gorgeous and matches perfectly with my existing decor. Highly recommend!",
      helpful: 12,
    },
    {
      id: 2,
      author: "Michael Chen",
      date: "July 28, 2023",
      rating: 4,
      title: "Great Quality, Minor Assembly Issues",
      review:
        "The sofa itself is beautiful and very well made. The wood is high quality and the cushions are comfortable. I took off one star because the assembly instructions could have been clearer. It took me longer than expected to put together, but the end result was worth it.",
      helpful: 8,
    },
    {
      id: 3,
      author: "Emily Rodriguez",
      date: "June 10, 2023",
      rating: 5,
      title: "Perfect Centerpiece for Our Living Room",
      review:
        "This sofa has transformed our living room. The design is timeless and the quality is outstanding. The cushions are firm but comfortable, and the wood frame is solid. Delivery was prompt and the sofa was well-packaged. Couldn't be happier with this purchase!",
      helpful: 15,
    },
  ]

  const handleHelpfulClick = (reviewId) => {
    if (helpfulReviews.includes(reviewId)) {
      return
    }

    setHelpfulReviews([...helpfulReviews, reviewId])
    toast.success(`You marked this review as helpful`)
  }

  const handleReportClick = (reviewId) => {
    toast.success(`Thank you for your feedback. We'll review this report.`)
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault()

    // In a real app, this would send the review to an API
    toast({
      title: "Review Submitted",
      description: "Thank you for your review! It will be published after moderation.",
    })

    setShowReviewForm(false)
    setReviewFormData({
      rating: 5,
      title: "",
      review: "",
      name: "",
      email: "",
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setReviewFormData({
      ...reviewFormData,
      [name]: value,
    })
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold mb-2">Customer Reviews</h2>
          <div className="flex items-center">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i < Math.floor(rating) ? "currentColor" : "none"}
                  className={i < Math.floor(rating) ? "" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-sm">Based on {reviewCount} reviews</span>
          </div>
        </div>

        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="mt-4 md:mt-0 bg-[#1080b0] hover:bg-[#0c6a8e] text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          Write a Review
        </button>
      </div>

      {showReviewForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-[#f8f9fa] p-4 rounded-md mb-6"
        >
          <h3 className="font-bold text-lg mb-4">Write Your Review</h3>
          <form onSubmit={handleReviewSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Rating</label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewFormData({ ...reviewFormData, rating: star })}
                    className="text-yellow-400 focus:outline-none"
                  >
                    <Star
                      size={24}
                      fill={star <= reviewFormData.rating ? "currentColor" : "none"}
                      className={star <= reviewFormData.rating ? "" : "text-gray-300"}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="review-title" className="block text-sm font-medium mb-1">
                Review Title
              </label>
              <input
                type="text"
                id="review-title"
                name="title"
                value={reviewFormData.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                placeholder="Summarize your experience"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="review-content" className="block text-sm font-medium mb-1">
                Review
              </label>
              <textarea
                id="review-content"
                name="review"
                value={reviewFormData.review}
                onChange={handleInputChange}
                rows="4"
                className="w-full p-2 border rounded-md"
                placeholder="Share your experience with this product"
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="review-name" className="block text-sm font-medium mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="review-name"
                  name="name"
                  value={reviewFormData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="review-email" className="block text-sm font-medium mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  id="review-email"
                  name="email"
                  value={reviewFormData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Your email will not be published</p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-[#1080b0] hover:bg-[#0c6a8e] text-white rounded-md">
                Submit Review
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex text-yellow-400 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < review.rating ? "currentColor" : "none"}
                      className={i < review.rating ? "" : "text-gray-300"}
                    />
                  ))}
                </div>
                <h3 className="font-bold">{review.title}</h3>
              </div>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>

            <p className="text-gray-700 mb-3">{review.review}</p>

            <div className="flex items-center text-sm">
              <span className="text-gray-500 mr-2">By {review.author}</span>
              <span className="text-gray-400">|</span>
              <div className="flex items-center ml-2">
                <button
                  onClick={() => handleHelpfulClick(review.id)}
                  disabled={helpfulReviews.includes(review.id)}
                  className={`flex items-center mr-4 ${
                    helpfulReviews.includes(review.id) ? "text-[#1080b0]" : "text-gray-500 hover:text-[#1080b0]"
                  }`}
                >
                  <ThumbsUp size={14} className="mr-1" />
                  Helpful ({helpfulReviews.includes(review.id) ? review.helpful + 1 : review.helpful})
                </button>

                <button
                  onClick={() => handleReportClick(review.id)}
                  className="flex items-center text-gray-500 hover:text-red-500"
                >
                  <Flag size={14} className="mr-1" />
                  Report
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

