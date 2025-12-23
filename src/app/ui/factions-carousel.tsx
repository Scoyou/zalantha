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
    <div className="mt-8 w-full md:mx-auto md:max-w-5xl">
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
            <div key={item.title} className="min-w-full px-0 sm:px-2">
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

      <div className="mt-5 flex flex-col items-center justify-between gap-3 text-ink md:flex-row">
        <button
          type="button"
          className="btn-primary text-xs uppercase tracking-[0.2em]"
          onClick={() => goTo(safeIndex - 1)}
          aria-label="View previous faction"
        >
          Prev
        </button>

        <div className="flex items-center gap-2">
          {items.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`View ${item.title}`}
              aria-current={index === safeIndex ? "true" : "false"}
              className={`h-2.5 w-2.5 rounded-full border border-ink/60 transition ${
                index === safeIndex ? "bg-ink/80" : "bg-transparent"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          className="btn-primary text-xs uppercase tracking-[0.2em]"
          onClick={() => goTo(safeIndex + 1)}
          aria-label="View next faction"
        >
          Next
        </button>
      </div>
      <p className="mt-3 text-xs uppercase tracking-[0.25em] text-ink/70">
        Race {safeIndex + 1} of {total}
      </p>
    </div>
  );
}
