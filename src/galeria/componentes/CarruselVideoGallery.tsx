"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper"; // Importa el tipo SwiperCore
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { VideoGalleryItem } from "../interfaces/types";

interface CarruselVideoGalleryProps {
  videos: VideoGalleryItem[];
}

const CarruselVideoGallery: React.FC<CarruselVideoGalleryProps> = ({ videos }) => {
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const [aspectRatios, setAspectRatios] = useState<string[]>(
    videos.map(() => "16/9") // Por defecto, asumimos formato horizontal 16:9
  );

  // Manejar el cambio de slide
  const handleSlideChange = (swiper: SwiperCore) => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === swiper.activeIndex) {
          video.play(); // Reproduce el video activo
        } else {
          video.pause(); // Pausa los demás videos
          video.currentTime = 0; // Reinicia el video
        }
      }
    });
  };

  // Detectar la relación de aspecto del video local
  const handleLoadedMetadata = (index: number, video: HTMLVideoElement) => {
    const aspectRatio = video.videoWidth / video.videoHeight;
    setAspectRatios((prev) => {
      const updatedRatios = [...prev];
      updatedRatios[index] = aspectRatio >= 1 ? "16/9" : "9/16"; // Horizontal o Vertical
      return updatedRatios;
    });
  };

  return (
    <section
      className="w-full bg-gradient-to-b from-gray-50 to-white py-6 flex justify-center"
      aria-label="Carrusel de videos"
    >
      <div className="w-full max-w-[600px]">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop
          modules={[Pagination, Navigation, Autoplay]}
          onSlideChange={handleSlideChange} // Callback al cambiar de slide
          className="video-swiper"
        >
          {videos.map((video, index) => {
            const isYouTube = video.url.includes("youtube.com") || video.url.includes("youtu.be");

            return (
              <SwiperSlide key={video.id} className="relative flex flex-col items-center">
                {/* Contenedor del video */}
                <div
                  className="relative rounded-lg overflow-hidden shadow-lg"
                  style={{
                    aspectRatio: aspectRatios[index], // Aplicar la relación de aspecto dinámica
                  }}
                >
                  {isYouTube ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeID(video.url)}?rel=0`}
                      title={video.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video
                      ref={(el) => {
                        if (el) {
                          videoRefs.current[index] = el;
                          el.onloadedmetadata = () => handleLoadedMetadata(index, el);
                        }
                      }} // Guarda la referencia del video y calcula la relación de aspecto
                      src={video.url}
                      muted
                      loop
                      playsInline
                      controls
                      className="w-full h-full object-cover"
                    ></video>
                  )}
                </div>

                {/* Caja con título y descripción debajo del video */}
                <div className="mt-4 w-full p-4 sm:p-6 bg-white rounded-lg shadow-md">
                  <h3 className="text-lg md:text-2xl font-bold text-gray-800 text-center">
                    {video.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 mt-2 text-center">
                    {video.description}
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

// Función para obtener el ID del video de YouTube
const getYouTubeID = (url: string): string | null => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\\ ]{11})/;
  const match = url.match(regex);
  if (match && match.length > 1) {
    return match[1]; // Devuelve el ID del video si se encuentra
  }
  return null; // Devuelve null si no se encuentra un ID válido
};

export default CarruselVideoGallery;
