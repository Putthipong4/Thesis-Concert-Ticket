import React, { useEffect, useState } from 'react'

function CarouselBar() {
    const images = [
        'https://www.thaiticketmajor.com/img_event/highlight/prefix_1/0299/3299/highlight_ttmevent_3299-67ce9bb389765.jpg',
        'https://www.thaiticketmajor.com/img_event/highlight/prefix_1/0352/3352/highlight_ttmevent_3352-680f5578ef3bd.png',
        'https://www.thaiticketmajor.com/img_event/highlight/prefix_1/0323/3323/highlight_ttmevent_3323-67e243bfcdb2e.png',
        'https://www.thaiticketmajor.com/img_event/highlight/prefix_1/0339/3339/highlight_ttmevent_3339-67f62a57a5ee0.jpg'
    ];
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + images.length) % images.length);
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % images.length);
    };
    return (
        <div className="w-full flex flex-col items-center pt-2 bg-gray-950">
            <div className='relative max-w-3xl overflow-hidden rounded-lg shadow-lg group'>
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`carousel-item w-full justify-center transition-opasity duration-500 ease-in-out ${index === current ? "opacity-100" : "opacity-0 absolute"
                            }`}
                    >
                        <img src={img} className='w-full h-full object-cover' />

                    </div>

                ))}
                 <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2  bg-opacity-0  hover:bg-opacity-100 text-white text-3xl px-3 py-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition duration-300
          cursor-pointer
          "
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2  bg-opacity-0 hover:bg-opacity-100 text-white text-3xl px-3 py-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition duration-300
          cursor-pointer
          "
        >
          ❯
        </button>

            </div>
            {/* Indicator dots */}
            <div className="flex justify-center gap-2 mt-2 mb-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`h-3 w-3 rounded-full ${index === current ? "bg-blue-500" : "bg-gray-300"
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}

export default CarouselBar