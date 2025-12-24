"use client";

import { useRef, useState } from "react";
import RaceCard from "./race-card";

type RaceItem = {
  imageUrl: string;
  altText: string;
  title: string;
  content: string;
};

function wrapIndex(index: number, length: number) {
  if (length === 0) {
    return 0;
  }
  return (index + length) % length;
}

export default function FactionsCarousel({ items }: { items: RaceItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const startXRef = useRef(0);
  const widthRef = useRef(1);
  const total = items.length;
  const safeIndex = wrapIndex(activeIndex, total);

  const goTo = (index: number) => {
    setActiveIndex(wrapIndex(index, total));
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") {
      event.preventDefault();
    }
    const trackWidth = trackRef.current?.offsetWidth ?? 1;
    widthRef.current = trackWidth;
    startXRef.current = event.clientX;
    setIsDragging(true);
    setDragOffset(0);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return;
    }
    setDragOffset(event.clientX - startXRef.current);
  };

  const handlePointerUp = () => {
    if (!isDragging) {
      return;
    }
    const threshold = widthRef.current * 0.2;
    if (dragOffset > threshold) {
      goTo(safeIndex - 1);
    } else if (dragOffset < -threshold) {
      goTo(safeIndex + 1);
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  const dragPercent = (dragOffset / widthRef.current) * 100;

  return (
    <div className="mt-8 w-full">
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className={`flex ${isDragging ? "cursor-grabbing" : "cursor-grab"} ${
            isDragging ? "" : "transition-transform duration-500 ease-out"
          }`}
          style={{
            transform: `translateX(calc(-${safeIndex * 100}% + ${dragPercent}%))`,
            touchAction: "pan-y",
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {items.map((item, index) => (
            <div key={item.title} className="min-w-full px-0 md:px-4">
              <RaceCard
                imageUrl={item.imageUrl}
                altText={item.altText}
                title={item.title}
                content={item.content}
                invertedImagePos={index % 2 === 1}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-4 text-ink">
        <div className="flex w-full max-w-[22rem] items-center gap-3 md:max-w-none md:gap-4">
          <button
            type="button"
            className="shrink-0 rounded-full border border-transparent bg-transparent px-2 py-2 text-ink/80 transition hover:-translate-y-0.5 hover:text-ink md:px-3"
            onClick={() => goTo(safeIndex - 1)}
            aria-label="View previous faction"
          >
            <span className="sr-only">Prev</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4 text-ink/80"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex flex-1 items-center justify-center gap-2">
            {items.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`View ${item.title}`}
                aria-current={index === safeIndex ? "true" : "false"}
                className={`carousel-dot h-1.5 w-6 rounded-full transition ${
                  index === safeIndex ? "carousel-dot--active" : ""
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            className="shrink-0 rounded-full border border-transparent bg-transparent px-2 py-2 text-ink/80 transition hover:-translate-y-0.5 hover:text-ink md:px-3"
            onClick={() => goTo(safeIndex + 1)}
            aria-label="View next faction"
          >
            <span className="sr-only">Next</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4 text-ink/80"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
      <p className="carousel-count mt-4 text-xs uppercase tracking-[0.25em]">
        Race {safeIndex + 1} of {total}
      </p>
    </div>
  );
}
