import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Project, VolumetricRender } from '../../types';

interface ProjectRendersCarouselProps {
  project: Project;
}

export const ProjectRendersCarousel: React.FC<ProjectRendersCarouselProps> = ({ project }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const renders = project.volumetricRenders && project.volumetricRenders.length > 0
    ? project.volumetricRenders
    : [{ id: 'default', title: 'Render Principal', url: project.image, category: 'volumetria' } as VolumetricRender];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? renders.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === renders.length - 1 ? 0 : prev + 1));
  };

  const currentRender = renders[currentIndex];

  return (
    <div className="relative w-full h-[60vh] sm:h-[75vh] bg-black rounded-2xl overflow-hidden shadow-inner group">
      {/* Current Image */}
      <img
        key={currentRender.url}
        src={currentRender.url}
        alt={currentRender.title}
        className="w-full h-full object-contain animate-in fade-in duration-500"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      {/* Info Badge */}
      <div className="absolute bottom-4 left-4 z-20">
        <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase rounded-lg shadow-sm border border-white/20 mb-1">
          {currentRender.category}
        </span>
        <h3 className="text-white font-bold text-lg">{currentRender.title}</h3>
      </div>

      {/* Navigation Controls */}
      {renders.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 right-4 flex gap-1.5 z-20">
            {renders.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-white scale-110' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
