import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '../assets/frontend_assets/assets';

const InfiniteCarousel = () => {
  const AUTOPLAY_INTERVAL = 750;

  const carouselItems = products
    .slice(0, 6)
    .map(product => ({
      id: product._id,
      imageUrl: product.image?.[0],
      name: product.name,
    }))
    .filter(item => item.imageUrl);
  
  const cloneCount = 5;
  const [clonedItems, setClonedItems] = useState([]);
  const [active, setActive] = useState(cloneCount); 
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef(null);

  useEffect(() => {
    if (carouselItems.length === 0) return;
    setClonedItems([
      ...carouselItems.slice(-cloneCount),
      ...carouselItems,
      ...carouselItems.slice(0, cloneCount),
    ]);
    setActive(cloneCount);
  }, [carouselItems.length]);

  useEffect(() => {
    if (!isTransitioning) return;
    const jump = () => {
      if (active < cloneCount) {
        setActive(active + carouselItems.length);
      } else if (active >= carouselItems.length + cloneCount) {
        setActive(active - carouselItems.length);
      }
      setIsTransitioning(false);
    };
    const timeout = setTimeout(jump, 500);
    return () => clearTimeout(timeout);
  }, [isTransitioning, active, carouselItems.length]);
  
  const handleNext = useCallback(() => {
    if (isTransitioning || carouselItems.length === 0) return;
    setActive(prev => prev + 1);
    setIsTransitioning(true);
  }, [isTransitioning, carouselItems.length]);
  
  const handlePrev = () => {
    if (isTransitioning || carouselItems.length === 0) return;
    setActive(prev => prev - 1);
    setIsTransitioning(true);
  };
  
  useEffect(() => {
    if (carouselItems.length > 1) {
      autoPlayRef.current = setInterval(handleNext, AUTOPLAY_INTERVAL);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [handleNext, carouselItems.length]);

  const resetAutoPlay = () => {
    clearInterval(autoPlayRef.current);
    if (carouselItems.length > 1) {
      autoPlayRef.current = setInterval(handleNext, AUTOPLAY_INTERVAL);
    }
  };
  
  if (!carouselItems.length) {
    return <div className="text-center p-8 bg-gray-100 rounded-lg">No product images to display.</div>;
  }
  
  const activeDotIndex = (active - cloneCount + carouselItems.length) % carouselItems.length;

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div 
        className="relative w-full max-w-2xl"
        onMouseEnter={() => clearInterval(autoPlayRef.current)}
        onMouseLeave={resetAutoPlay}
      >
        <div className="overflow-hidden">
          <div
            className="flex transition-transform ease-in-out"
            style={{
              transform: `translateX(calc(50% - ${active * 11}rem - 5rem))`,
              transitionDuration: isTransitioning ? '500ms' : '0ms',
            }}
          >
            {clonedItems.map((item, idx) => (
              <Link
                to={`/product/${item.id}`}
                key={`${item.id}-${idx}`}
                className={`relative flex-shrink-0 w-40 h-40 rounded-lg shadow-md flex items-center justify-center bg-white border transition-all duration-300 mx-2
                  ${idx === active ? 'scale-110 z-10 shadow-2xl' : 'scale-90 opacity-60'}`}
              >
                {/* THIS IS THE FIX: Changed object-cover to object-contain */}
                <img src={item.imageUrl} alt={item.name} className="object-contain w-full h-full rounded-lg p-2" />
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() => { handlePrev(); resetAutoPlay(); }}
          className="absolute top-1/2 -left-4 md:-left-10 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition z-20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <button
          onClick={() => { handleNext(); resetAutoPlay(); }}
          className="absolute top-1/2 -right-4 md:-right-10 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition z-20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Indicator Dots */}
      <div className="flex justify-center gap-2">
        {carouselItems.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (isTransitioning) return;
              setActive(idx + cloneCount);
              setIsTransitioning(true);
              resetAutoPlay();
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300
              ${activeDotIndex === idx ? 'bg-indigo-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default InfiniteCarousel;