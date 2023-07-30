"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface CarouselProps {
  images: string[];
}

export function Carousel({ images }: CarouselProps) {
  const [slide, setSlide] = useState(0);

  const handlePrevSlide = () => {
    setSlide((prevSlide) => prevSlide - 1);
  };

  const handleNextSlide = () => {
    setSlide((prevSlide) => prevSlide + 1);
  };

  return (
    <div
      id="carouselExampleCaptions"
      className="relative w-[45vw] h-[88vh] sm:w-screen sm:h-auto"
      data-te-carousel-init
      data-te-carousel-slide={slide}
    >
      <div
        className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
        data-te-carousel-indicators
      >
        {images.map((item, index) => (
          <button
            key={index}
            onClick={() => setSlide(index)}
            type="button"
            data-te-target="#carouselExampleCaptions"
            data-te-slide-to={index}
            aria-current={index !== slide ? "true" : "false"}
            data-te-carousel-active
            className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <div
        className="relative w-full overflow-hidden after:clear-both after:block after:content-['']"
        style={{ display: "flex" }}
      >
        {images.map((item, index) => (
          <div
            key={index}
            className={`relative ${
              images.length > 1 &&
              (index === slide
                ? "-ml-[100%]"
                : index === slide + 1
                ? "-mr-[100%]"
                : "w-0")
            } flex-shrink-0 transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none`}
            data-te-carousel-active
            data-te-carousel-item
            style={{ backfaceVisibility: "hidden", flex: "0 0 100%" }}
          >
            <img src={item} className="aspect-square block w-full" alt="..." />
          </div>
        ))}
      </div>

      <button
        onClick={handlePrevSlide}
        className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        data-te-target="#carouselExampleCaptions"
        data-te-slide="prev"
      >
        <span className="inline-block h-8 w-8">
          <ChevronLeft />
        </span>
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Previous
        </span>
      </button>
      <button
        onClick={handleNextSlide}
        className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        data-te-target="#carouselExampleCaptions"
        data-te-slide="next"
      >
        <span className="inline-block h-8 w-8">
          <ChevronRight />
        </span>
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Next
        </span>
      </button>
    </div>
  );
}
