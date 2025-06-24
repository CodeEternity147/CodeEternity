import React from 'react';
import WhoWeServe from '../Navbar/WhoWeServe';
import Header from '../Navbar/Header';
import useScrollToTop from '../../hooks/useScrollToTop';

const WhoWeOfferPage = () => {
    useScrollToTop();
    return (
        <div className='bg-purple-100 pt-24'>
            <Header/>
            <WhoWeServe/>
        </div>
    )
}

export default WhoWeOfferPage;
