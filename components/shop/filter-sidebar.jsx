"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export default function FilterSidebar({ activeFilters, onFilterChange, className = "" }) {
  const [localFilters, setLocalFilters] = useState(activeFilters)

  // Update local state when props change
  useEffect(() => {
    setLocalFilters(activeFilters)
  }, [activeFilters])

  const handleCategoryChange = (category) => {
    const updatedCategories = localFilters.categories.includes(category)
      ? localFilters.categories.filter((c) => c !== category)
      : [...localFilters.categories, category]

    const updatedFilters = {
      ...localFilters,
      categories: updatedCategories,
    }

    setLocalFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const handleVendorChange = (vendor) => {
    const updatedVendors = localFilters.vendors.includes(vendor)
      ? localFilters.vendors.filter((v) => v !== vendor)
      : [...localFilters.vendors, vendor]

    const updatedFilters = {
      ...localFilters,
      vendors: updatedVendors,
    }

    setLocalFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const handleRatingChange = (rating) => {
    const updatedFilters = {
      ...localFilters,
      ratings: localFilters.ratings === rating ? null : rating,
    }

    setLocalFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const handlePriceChange = (min, max) => {
    const updatedFilters = {
      ...localFilters,
      priceRange: [min, max],
    }

    setLocalFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const clearAllFilters = () => {
    const resetFilters = {
      categories: [],
      priceRange: [0, 5000],
      vendors: [],
      ratings: null,
    }

    setLocalFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  const categories = ["Living Room", "Bedroom", "Dining Room", "Office", "Outdoor"]

  const vendors = ["Artisan Creations", "Modern Designs", "Luxury Furnishings", "Sleep Essentials", "Work Comfort"]

  const priceRanges = [
    { label: "Under $500", min: 0, max: 500 },
    { label: "$500 - $1000", min: 500, max: 1000 },
    { label: "$1000 - $2000", min: 1000, max: 2000 },
    { label: "Over $2000", min: 2000, max: 5000 },
  ]

  const hasActiveFilters =
    localFilters.categories.length > 0 ||
    localFilters.vendors.length > 0 ||
    localFilters.ratings !== null ||
    localFilters.priceRange[0] > 0 ||
    localFilters.priceRange[1] < 5000

  return (
    <div className={`bg-white rounded-md shadow-sm p-4 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Filters</h2>
        {hasActiveFilters && (
          <button onClick={clearAllFilters} className="text-sm text-[#1080b0] hover:underline">
            Clear All
          </button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Active Filters:</p>
          <div className="flex flex-wrap gap-2">
            {localFilters.categories.map((category) => (
              <div
                key={`cat-${category}`}
                className="bg-[#bae1e6] text-[#1080b0] text-xs px-2 py-1 rounded-full flex items-center"
              >
                {category}
                <button onClick={() => handleCategoryChange(category)} className="ml-1">
                  <X size={12} />
                </button>
              </div>
            ))}

            {localFilters.vendors.map((vendor) => (
              <div
                key={`ven-${vendor}`}
                className="bg-[#c5d4d9] text-[#1080b0] text-xs px-2 py-1 rounded-full flex items-center"
              >
                {vendor}
                <button onClick={() => handleVendorChange(vendor)} className="ml-1">
                  <X size={12} />
                </button>
              </div>
            ))}

            {localFilters.ratings && (
              <div className="bg-[#e3e1e1] text-gray-700 text-xs px-2 py-1 rounded-full flex items-center">
                {localFilters.ratings}+ Stars
                <button onClick={() => handleRatingChange(null)} className="ml-1">
                  <X size={12} />
                </button>
              </div>
            )}

            {(localFilters.priceRange[0] > 0 || localFilters.priceRange[1] < 5000) && (
              <div className="bg-[#e3e1e1] text-gray-700 text-xs px-2 py-1 rounded-full flex items-center">
                ${localFilters.priceRange[0]} - ${localFilters.priceRange[1]}
                <button onClick={() => handlePriceChange(0, 5000)} className="ml-1">
                  <X size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={localFilters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="rounded border-gray-300 text-[#1080b0] focus:ring-[#1080b0]"
              />
              <span className="ml-2 text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range, index) => (
            <label key={index} className="flex items-center cursor-pointer">
              <input
                type="radio"
                checked={localFilters.priceRange[0] === range.min && localFilters.priceRange[1] === range.max}
                onChange={() => handlePriceChange(range.min, range.max)}
                className="rounded-full border-gray-300 text-[#1080b0] focus:ring-[#1080b0]"
              />
              <span className="ml-2 text-sm">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Vendors */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Vendors</h3>
        <div className="space-y-2">
          {vendors.map((vendor) => (
            <label key={vendor} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={localFilters.vendors.includes(vendor)}
                onChange={() => handleVendorChange(vendor)}
                className="rounded border-gray-300 text-[#1080b0] focus:ring-[#1080b0]"
              />
              <span className="ml-2 text-sm">{vendor}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Ratings */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Ratings</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center cursor-pointer">
              <input
                type="radio"
                checked={localFilters.ratings === rating}
                onChange={() => handleRatingChange(rating)}
                className="rounded-full border-gray-300 text-[#1080b0] focus:ring-[#1080b0]"
              />
              <span className="ml-2 text-sm">{rating}+ Stars</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

