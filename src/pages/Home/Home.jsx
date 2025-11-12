import React from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Home = () => {

  const handleClick = () => {
    toast.success("Welcome back!", { position: "top-center" });
  };

  return (
    <div>
     <h2>Food & Beverage Trade Hub</h2>
     <button onClick={handleClick}>Show Toast</button>
    </div>
  );
};

export default Home;