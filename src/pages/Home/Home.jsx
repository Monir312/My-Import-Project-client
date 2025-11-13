import React from 'react';
import Banner from '../Section/Banner';
import RecentProducts from '../Section/RecentProducts';
import Reviews from '../Section/Reviews';
import WhyChooseUs from '../Section/WhyChooseUs';

const Home = () => {

  return (
    <div>
     <Banner></Banner>
    <RecentProducts></RecentProducts>
    <Reviews></Reviews>
    <WhyChooseUs></WhyChooseUs>
    </div>
  );
};

export default Home;