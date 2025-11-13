import React from 'react';
import { Outlet, useNavigation } from 'react-router';
import Navbar from '../components/Navbar';
import Loading from '../pages/Loading';
import Footer from '../components/Footer';
import ChangeMode from '../colorContent/ChangeMode';


const MainLayout = () => {

  const {state} = useNavigation();

  return (
    <div>
      <header>
        <nav className=''>
          <Navbar></Navbar>
        </nav>
      </header>
      <ChangeMode />


      <main className='w-full '>
        <section className="main col-span-6">
          {state == "loading" ? <Loading/> : <Outlet></Outlet>}
        </section>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayout;