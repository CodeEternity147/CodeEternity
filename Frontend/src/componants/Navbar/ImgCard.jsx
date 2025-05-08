import React from 'react';

import { FaArrowRight } from 'react-icons/fa';

import data from '../../data/data';

function ImgCard({ index }) {
  const Item = data.whatWeOffer[index];

  return (
    <div
      className="w-full max-w-md mx-auto p-4 rounded-xl shadow-md flex flex-col items-center bg-opacity-90 min-h-[500px]"
      style={{ backgroundColor: Item.iconBgColor }}
    >
      <img
        src={Item.sideImg}
        alt={Item.name}
        className="w-full h-72 object-cover rounded-lg border-8 border-white"
      />
      <p className="mt-4 text-center text-2xl font-semibold text-black hover:text-blue-600 transition-colors duration-300">
        {Item.summary}
      </p>

      <p className="mt-2 flex items-center text-black text-sm">
        Get the resource for free <FaArrowRight className="ml-2" />
      </p>
    </div>
  );
}

export default ImgCard;
