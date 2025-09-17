"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ScrollableTabs = ({ items, activeItem, setActiveItem }) => {
  const scrollRef = useRef(null);

  const handleShift = (direction) => {
    const currentIndex = items.indexOf(activeItem);
    let newIndex =
      direction === "left"
        ? Math.max(currentIndex - 1, 0) // stop at first
        : Math.min(currentIndex + 1, items.length - 1); // stop at last

    setActiveItem(items[newIndex]);

    // Scroll new active tab into view
    if (scrollRef.current) {
      const tabEl = scrollRef.current.children[newIndex];
      tabEl?.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  };

  return (
    <div className="flex items-center bg-gray-50 p-2 rounded-full shadow-sm w-fit max-w-4xl mx-auto">
      {/* Left arrow */}
      <button
        onClick={() => handleShift("left")}
        disabled={items.indexOf(activeItem) === 0}
        className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-30"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Scrollable tabs */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-2"
      >
        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setActiveItem(item)}
            className={`whitespace-nowrap px-4 py-1 rounded-full font-medium transition ${
              activeItem === item
                ? "bg-black text-white"
                : "text-black hover:bg-gray-200"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => handleShift("right")}
        disabled={items.indexOf(activeItem) === items.length - 1}
        className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-30"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default ScrollableTabs;
