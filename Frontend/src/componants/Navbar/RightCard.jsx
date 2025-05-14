import * as FaIcons from 'react-icons/fa';
import data from '../../data/data'; // adjust if path differs

const RightCard = ({ index }) => {
  const field = data.whatWeOffer[index];
  const bgColor = field.iconBgColor;
  
  return (
    <div className="space-y-6">
      <div className="border-b border-b-gray-200 pb-4">
        <p className="text-gray-600 text-base">{field.description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {field?.courses.map((item, idx) => {
          const Icon = FaIcons[item.reactIcon];
          return (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-sm hover:shadow transition-all duration-300 border border-gray-100 flex overflow-hidden"
            >
              <div 
                className="w-2 h-auto" 
                style={{ backgroundColor: bgColor }}
              />
              <div className="p-4 flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className="p-2 rounded-md text-black text-sm"
                      style={{ backgroundColor: bgColor }}
                    >
                      {Icon && <Icon />}
                    </div>
                    <h3 className="text-base font-semibold text-gray-800">{item.name}</h3>
                  </div>
                  <button className="text-xs px-3 py-1 bg-blue-50 text-blue-600 font-medium rounded-md hover:bg-blue-100 transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RightCard;