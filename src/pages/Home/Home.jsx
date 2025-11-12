import React from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Home = () => {
  React.useEffect(() => {
    console.log("SweetAlert is about to run...");

    Swal.fire({
      title: "The Internet?",
      text: "That thing is still around?",
      icon: "question",
    });
  }, []);


  const handleClick = () => {
    toast.success("Welcome back!", { position: "top-center" });
  };

  return (
    <div>
     <h2>Home</h2>
     <button onClick={handleClick}>Show Toast</button>
    </div>
  );
};

export default Home;