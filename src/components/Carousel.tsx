import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  id: string;
  children: React.ReactNode[];
  className?: string;
  itemClassName?: string;
  showArrows?: boolean;
  showDots?: boolean;
  gapClass?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  id,
  children,
  className = '',
  itemClassName = 'w-[82vw] sm:w-[320px] md:w-[340px] flex-shrink-0 snap-start',
  showArrows = true,
  showDots = true,
  gapClass = 'gap-4 sm:gap-6',
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(React.Children.count(children));

  const updateScrollState = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate active slide index
    const childNodes = scrollRef.current.children;
    if (childNodes.length > 0) {
      const firstChildWidth = (childNodes[0] as HTMLElement).offsetWidth || 1;
      const index = Math.round(scrollLeft / (firstChildWidth + 16));
      setActiveIndex(Math.min(Math.max(index, 0), childNodes.length - 1));
    }
  }, []);

  useEffect(() => {
    setTotalItems(React.Children.count(children));
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [children, updateScrollState]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = container.clientWidth * 0.85;

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const childNodes = scrollRef.current.children;
    if (childNodes[index]) {
      const child = childNodes[index] as HTMLElement;
      scrollRef.current.scrollTo({
        left: child.offsetLeft - scrollRef.current.offsetLeft,
        behavior: 'smooth',
      });
    }
  };

  if (!children || children.length === 0) return null;

  return (
    <div className={`relative group ${className}`} id={`carousel-${id}`}>
      {/* Navigation Arrows for Mobile & Desktop */}
      {showArrows && children.length > 1 && (
        <div className="hidden sm:flex items-center gap-2 absolute -top-14 right-0 z-10">
          <button
            id={`carousel-${id}-prev-btn`}
            type="button"
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous Slide"
            className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
              canScrollLeft
                ? 'bg-[#131D31] border-[#1E293B] text-[#F8FAFC] hover:bg-[#0284C7] hover:border-[#0284C7] hover:text-white shadow-lg'
                : 'bg-[#131D31]/40 border-[#1E293B]/40 text-[#475569] cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            id={`carousel-${id}-next-btn`}
            type="button"
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label="Next Slide"
            className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
              canScrollRight
                ? 'bg-[#131D31] border-[#1E293B] text-[#F8FAFC] hover:bg-[#0284C7] hover:border-[#0284C7] hover:text-white shadow-lg'
                : 'bg-[#131D31]/40 border-[#1E293B]/40 text-[#475569] cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Touch-optimized horizontal track */}
      <div
        ref={scrollRef}
        className={`flex ${gapClass} overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0`}
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {React.Children.map(children, (child, idx) => (
          <div key={idx} className={itemClassName}>
            {child}
          </div>
        ))}
      </div>

      {/* Mobile Swipe Indicators & Quick Controls */}
      {showDots && totalItems > 1 && (
        <div className="flex items-center justify-between sm:justify-center gap-3 pt-4">
          {/* Mobile Arrows */}
          <button
            id={`carousel-mobile-${id}-prev`}
            type="button"
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Swipe Left"
            className={`sm:hidden p-2 rounded-lg border text-xs transition-colors ${
              canScrollLeft
                ? 'bg-[#131D31] border-[#1E293B] text-[#38BDF8]'
                : 'bg-[#131D31]/30 border-[#1E293B]/30 text-[#475569] cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 overflow-x-auto py-1">
            {Array.from({ length: totalItems }).map((_, index) => (
              <button
                key={index}
                id={`carousel-${id}-dot-${index}`}
                type="button"
                onClick={() => scrollToIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === index
                    ? 'w-6 bg-[#38BDF8]'
                    : 'w-1.5 bg-[#1E293B] hover:bg-[#334155]'
                }`}
              />
            ))}
          </div>

          {/* Mobile Next Arrow */}
          <button
            id={`carousel-mobile-${id}-next`}
            type="button"
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label="Swipe Right"
            className={`sm:hidden p-2 rounded-lg border text-xs transition-colors ${
              canScrollRight
                ? 'bg-[#131D31] border-[#1E293B] text-[#38BDF8]'
                : 'bg-[#131D31]/30 border-[#1E293B]/30 text-[#475569] cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
