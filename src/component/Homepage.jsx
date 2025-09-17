import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import landingImage from "../assets/image/landing.png";
import Aos from "aos";
// import 'aos/dist/aos.css'
const Homepage = () => {
  const [count, setCount] = useState(1);
  const [quality, setQuality] = useState(1);
  const [customer, setCustomer] = useState(1);

  // useEffect(() => {
  //     Aos.init({
  //       duration:3000,
  //       once:false,
  //       offset: 100,
  //       easing: 'ease-in-out',
  //       infinite: true,
  //     //   Aos.refresh();
  //     })
  //   }, [count, quality, customer])
  const brandTarget = 200;
  const qualityTarget = 2000;
  const customerTarget = 3000;

  useEffect(() => {
    const countBrand = () => {
      if (count < brandTarget) {
        const timer = setTimeout(
          () => setCount((prevCount) => prevCount + 1),
          10
        );
        return () => clearTimeout(timer);
      }
    };

    const countQuality = () => {
      if (quality < qualityTarget) {
        const timer = setTimeout(
          () => setQuality((prevQuality) => prevQuality + 1),
          10
        );
        return () => clearTimeout(timer);
      }
    };

    const countCustomer = () => {
      if (customer < customerTarget) {
        const timer = setTimeout(
          () => setCustomer((prevCustomer) => prevCustomer + 1),
          10
        );
        return () => clearTimeout(timer);
      }
    };
    countBrand();
    countQuality();
    countCustomer();
  }, [count, quality, customer]);

  return (
    <div className="grid lg:grid-cols-2 bg-amber-50 p-10">
      <div className="flex flex-col justify-center">
        <p className="lg:text-6xl md:text-6xl text-4xl font-bold text-stone-800">
          Shop Smarter, Live Better
        </p>
        <p className="lg:text-6xl font-bold md:text-6xl text-4xl text-stone-800">
          with the Perfect
        </p>
        <p className="lg:text-6xl font-bold md:text-6xl text-4xl text-stone-800">
          Outfit
        </p>
        <p className="my-3 text-stone-700 lg:text-2xl md:text-2xl text-2xl">
          Discover exclusive products, unbeatable deals, and a seamless shopping
          experience—all in one place.
        </p>
        <div className="my-10">
          <Link
            className="bg-orange-500 rounded-full p-3 px-7 hover:bg-orange-600 text-white font-semibold shadow-md transition duration-300"
            to="/login"
          >
            Shop Now
          </Link>
          <div className="flex lg:gap-10 md:gap-10 my-5 flex-wrap">
            <div>
              <p className="lg:text-5xl md:text-6xl text-2xl font-bold text-orange-500">
                {count.toLocaleString()} +
              </p>
              <p className="text-stone-800">International Brands</p>
            </div>
            <div>
              <p className="lg:text-5xl md:text-6xl text-2xl font-bold text-orange-500">
                {quality.toLocaleString()} +
              </p>
              <p className="text-stone-800">High Quality Products</p>
            </div>
            <div>
              <p className="lg:text-5xl md:text-6xl text-2xl font-bold text-orange-500">
                {customer.toLocaleString()} +
              </p>
              <p className="text-stone-800">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        {/* <img
                    src={ava1}
                    alt="A representative image"
                    className='rounded-lg shadow-lg w-full max-w-sm'
                /> */}
        {/* Replace the old image with this one if you want */}
        <img
          className="rounded-lg shadow-lg w-full max-w-md h-[85%] object-cover transform transition-transform duration-500 hover:scale-105"
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60"
          alt="Hero-section Image"
        />

        {/* <img className='rounded-lg shadow-lg w-full max-w-sm h-[80%]' src={landingImage} alt="Landing Visual" /> */}
      </div>
    </div>
  );
};

export default Homepage;
