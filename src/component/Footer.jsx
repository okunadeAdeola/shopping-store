import React from 'react'
import { Link } from 'react-router-dom';
import { FaSquareTwitter, FaFacebook, FaSquareInstagram } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import pay from '../assets/image/pay.png';
import paypal from '../assets/image/paypal.png';
import visa from '../assets/image/visa.png';
import gpay from '../assets/image/gpay.png';
import master from '../assets/image/master.png';
import logoImage from '../assets/image/logo1.png'


const Footer = () => {
  return (
    <div className='bg-gray-800 w-full'>
      <div className='grid grid-cols-2 gap-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 p-8 text-white'>
        <div>
          <div className="flex items-center mt-[-2px]">
            <Link to="/">
              <img src={logoImage} alt="Logo"  style={{width: "60px", height: "60px"}}/>
            </Link>
          </div>
          <p className='my-3 hover:text-orange-600 cursor-pointer'>We offer stylish clothes that you’ll love to wear, tailored for both women and men."</p>
          <ul className='flex gap-5'>
            <li className="hover:text-orange-600 cursor-pointer"><FaFacebook /></li>
            <li className="hover:text-orange-600 cursor-pointer"><FaSquareInstagram /></li>
            <li className="hover:text-orange-600 cursor-pointer"><FaSquareTwitter /></li>
            <li className="hover:text-orange-600 cursor-pointer"><IoLogoYoutube /></li>
          </ul>
        </div>
        <div>
          <h3 className='font-bold mb-2 hover:text-orange-600 cursor-pointer'>Customer Service</h3>
          <ul>
            <li className="hover:text-orange-600 cursor-pointer">Help Center</li>
            <li className="hover:text-orange-600 cursor-pointer">Track Order</li>
            <li className="hover:text-orange-600 cursor-pointer">Returns</li>
            <li className="hover:text-orange-600 cursor-pointer">Shipping Info</li>
          </ul>
        </div>
        <div>
          <h3 className='font-bold mb-2 hover:text-orange-600 cursor-pointer'>About Us</h3>
          <ul>
            <li className="hover:text-orange-600 cursor-pointer">Our Story</li>
            <li className="hover:text-orange-600 cursor-pointer">Careers</li>
            <li className="hover:text-orange-600 cursor-pointer">Press</li>
            <li className="hover:text-orange-600 cursor-pointer">Blog</li>
          </ul>
        </div>
        <div>
          <h3 className='font-bold mb-2 hover:text-orange-600 cursor-pointer'>Categories</h3>
          <ul>
            <li className="hover:text-orange-600 cursor-pointer ">Men</li>
            <li className="hover:text-orange-600 cursor-pointer">Women</li>
            <li className="hover:text-orange-600 cursor-pointer ">Electronics</li>
            <li className="hover:text-orange-600 cursor-pointer ">Accessories</li>
          </ul>
        </div>
        <div>
          <h3 className='font-bold mb-2 hover:text-orange-600 cursor-pointer'>Contact</h3>
          <ul>
            <li className="hover:text-orange-600 cursor-pointer">Email: support@example.com</li>
            <li className="hover:text-orange-600 cursor-pointer ">Phone: +123 456 7890</li>
            <li className="hover:text-orange-600 cursor-pointer">Address: 123 Main St, City</li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="lg:flex justify-between mt-5 p-5">
  {/* Logo Section */}
  <div className="flex items-center gap-5">
    <Link to="/">
      <img src={logoImage} alt="Logo"  style={{width: "60px", height: "60px"}}/>
    </Link>
    <p className="text-white mt-2">2000 - 2024</p>
  </div>

  {/* Payment Methods Section */}
  <div className="flex flex-wrap justify-center lg:justify-end gap-3 mt-5 lg:mt-0">
    <img src={pay} alt="Pay" className="w-12 h-12 object-contain" />
    <img src={paypal} alt="PayPal" className="w-12 h-12 object-contain" />
    <img src={master} alt="MasterCard" className="w-12 h-12 object-contain" />
    <img src={visa} alt="Visa" className="w-12 h-12 object-contain" />
    <img src={gpay} alt="Google Pay" className="w-12 h-12 object-contain" />
  </div>
</div>

    </div>
  )
}

export default Footer
