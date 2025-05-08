import * as FaIcons from 'react-icons/fa';

import data from '../../data/data'; // adjust if path differs

const RightCard = ({ index }) => {
  const field = data.whatWeOffer[index];
  const bgColor = field.iconBgColor;

  return (
    <div className="space-y-6">
     <div className="border-b border-b-gray-500 pb-4">
  <p className="text-gray-500 text-lg">{field.description}</p>
</div>


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {field?.courses.map((item, idx) => {
          const Icon = FaIcons[item.reactIcon];
          return (
            <div
              key={idx}
              className="flex items-start bg-blue-50 p-4 rounded-xl shadow-sm space-x-4 hover:shadow-md transition-all duration-300"
            >
              <div
                className="p-3 rounded-xl text-black text-xl"
                style={{ backgroundColor: bgColor }}
              >
                {Icon && <Icon />}
              </div>
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600 text-sm mt-1">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RightCard;
