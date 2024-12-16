import React from 'react';
import Banner from '../components/home/Banner';
import Feature from '../components/Features/Feature'

const Home = () => {
  document.title = 'Argent Bank - Accueil'
  return (
    <div>
      <Banner />
      <Feature />
    </div>
  );
};

export default Home;
