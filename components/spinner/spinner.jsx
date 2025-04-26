"use client"
import React from "react";

export default function LoadingSpinner({ 
  size = "md", 
  color = "primary",
  speed = "fast",
  center = true 
}) {
  // Size configuration
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  // Stroke width configuration
  const strokeClasses = {
    sm: "border-2",
    md: "border-[3px]",
    lg: "border-4",
    xl: "border-[5px]"
  };

  // Color configuration
  const colorClasses = {
    primary: "border-primary",
    secondary: "border-secondary",
    light: "border-light-gray-blue",
    dark: "border-deep-earth"
  };

  // Speed configuration
  const speedClasses = {
    fast: "animate-spin-fast",
    medium: "animate-spin-medium",
    slow: "animate-spin-slow"
  };

  // Container classes
  const containerClasses = center ? "flex items-center justify-center" : "inline-block";

  return (
    <div className={containerClasses}>
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Main spinner ring */}
        <div className={`
          absolute inset-0 rounded-full 
          ${strokeClasses[size]} 
          border-t-transparent 
          ${colorClasses[color]} 
          ${speedClasses[speed]}
        `}></div>
        
        {/* Optional subtle inner ring */}
        <div className={`
          absolute inset-0 rounded-full 
          ${strokeClasses[size]} 
          border-t-transparent 
          border-light-gray-blue 
          animate-spin-slow 
          opacity-30
        `} style={{ transform: 'scale(0.7)' }}></div>
      </div>
    </div>
  );
}