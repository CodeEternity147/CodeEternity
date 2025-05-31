import React from 'react';
import Navbar from '../Navbar/Header';
import WhatWeOfferContent from '../Navbar/WhatWeoffer';

const WhatWeOffer = ({ selectedChildCourse, setSelectedChildCourse }) => {
    console.log('WhatWeOffer page props:', { selectedChildCourse, setSelectedChildCourse }); // Debug log

    return (
        <div className=' ' >
            <Navbar />
            <WhatWeOfferContent 
                selectedChildCourse={selectedChildCourse}
                setSelectedChildCourse={setSelectedChildCourse}
            />
        </div>
    );
};

export default WhatWeOffer;