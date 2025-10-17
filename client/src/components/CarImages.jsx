import React, { useEffect, useState } from "react";

const CarImages = ({ car }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (car) {
      setImage(car.images[0]);
    }
  }, [car]);
  return (
    <div className="flex flex-col gap-5">
      {/* MAIN IMAGE */}
      <div className="bg-primary rounded-2xl overflow-hidden flex-center w-full h-[244px] lg:h-[322px] ring-1 ring-slate-900/10">
        <img src={image} alt="main car image" loading="eager" className="max-w-full max-h-full object-contain" />
      </div>
      {/* THUMBNAILS GRID */}
      <div className="grid grid-cols-2 gap-3">
        {car.images.map((item, index) => (
          <button key={index} onClick={() => setImage(item)} type="button" className={`bg-primary rounded-2xl overflow-hidden flex-center w-full h-[111px] lg:h-[122px] transition-transform duration-400 cursor-pointer ring-1 ring-slate-900/10 ${item === image ? 'border-4 border-solid/10 scale-[101%]' : 'hover:scale-[102%]'}`}>
            <img
              src={item}
              alt={`thumbnail-${index}`}
              className="max-w-full max-h-full object-contain"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default CarImages;
