import React, { useState, useEffect } from "react";
const Slide1 = "/images/ads/ad1.jpg";
const Slide2 = "/images/ads/ad2.jpg";
const Slide3 = "/images/ads/ad3.jpg";
const Slide4 = "/images/ads/ad4.jpg";
const Slide5 = "/images/ads/ad5.jpg";

const slides = [
  { id: 1, content: Slide1 },
  { id: 2, content: Slide2 },
  { id: 3, content: Slide3 },
  { id: 4, content: Slide4 },
  { id: 5, content: Slide5 },
];

const SlidingBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // 3초에 한번씩 슬라이딩
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div
      className="overflow-hidden relative w-full"
      style={{ paddingBottom: `${(143 / 558) * 100}%` }}
    >
      <div
        className="absolute top-0 left-0 w-full h-full flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <img
            key={slide.id}
            src={slide.content}
            alt="slidebanner"
            className="w-full h-50 object-cover flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default SlidingBanner;
