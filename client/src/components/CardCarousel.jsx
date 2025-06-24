import React from 'react';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpg';
import image6 from '../assets/image6.jpg';

const cards = [
  { chapter: "", title: "RECUERDOS INOLVIDABLES", img: image1 },
  { chapter: "", title: "CULTURAS FASCINANTES", img: image2 },
  { chapter: "", title: "MOMENTOS EN FAMILIA", img: image3 },
  { chapter: "", title: "NUEVAS AVENTURAS", img: image4 },
  { chapter: "", title: "ESCRIBIR TU HISTORIA", img: image5 },
  { chapter: "", title: "ENCUENTROS ESPECIALES", img: image6 },
];

export default function CardCarousel() {
  return (
    <div className="py-16 px-4 bg-gradient-to-br from-[#0A0F1C] via-[#0F172A] to-[#1E293B] relative overflow-x-hidden">
      {/* Título del carrusel */}
      <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF]">
        Explora Nuestros Destinos
      </h2>

      {/* Carrusel de tarjetas */}
      <div className="flex justify-center items-end gap-4 px-8">
        {cards.map((card, index) => {
          const rotate = (index - (cards.length - 1) / 2) * 8;
          return (
            <div
              key={index}
              style={{
                transform: `rotate(${rotate}deg) translateY(${Math.abs(rotate) * 1.2}px)`,
                zIndex: cards.length - Math.abs(index - (cards.length - 1) / 2),
              }}
              className="group flex-shrink-0 relative w-48 h-72 rounded-xl shadow-lg overflow-hidden bg-black text-white transition-transform duration-300 hover:z-50 hover:scale-110"
            >
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-full object-cover absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 z-10 p-4 bg-gradient-to-t from-black/90 to-transparent text-white font-bold">
                <p className="text-sm text-yellow-500">VIAJA POR: {card.chapter}</p>
                <p className="text-base">{card.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
