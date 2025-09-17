import React, { useEffect, useRef, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import Upbar from './Upbar';
import Carousel from './Carousel';
import { BsSearch } from 'react-icons/bs';
import { FaCartShopping } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../axiosInstance';
import logoImage from '../assets/image/logo1.png'
const Navbar = ({ openToggle, allProducts }) => {

  const store = useSelector((state) => state.counterReducer.cart);

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [totalProduct, setTotalProduct] = useState('');

  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    if (searchQuery) {
      const results = allProducts.filter(product => product?.name && product?.name?.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery, allProducts]);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current || !dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]);

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [dropdownOpen]);


  useEffect(() => {
    setTotalProduct(store.length);
  }, [store.length]);

  const handleCartRoute = () => {
    navigate('/cart')
  }

  const handleFilteredProducts = async (product) => {
    const productId = product.id;
    try {
      const response = await axiosInstance.post(`/return-product/${productId}`);
      if (response.data) {
        navigate(`/product/${productId}`);
      }
    } catch (error) {
      toast.error('Failed to fetch data');
    }

  }

  const location = useLocation();
  const hiddenRoutes = ['/gateway'];
  const isHidden = hiddenRoutes.some(route => location.pathname.startsWith(route));

  return isHidden ? null : (
    <>
      <Carousel />
      <nav className='m-0 lg:ps-10 shadow w-full sticky top-0 bg-amber-50 py-5 z-[1000]'>
        <div className='flex justify-between lg:mx-0 md:mx-5 mx-2'>
          <div className="flex items-center">
            <Link to="/" className='mt-2 flex'>
             <span><img src={logoImage} alt="" style={{width: '90px', height: '50px'}} /></span> 
              {/* <span className="text-xl font-semibold text-orange-600">.co</span> */}
            </Link>
          </div>
          <div className='mt-6 hidden lg:block'>
            <ul className='flex mx-4 justify-between gap-10'>
              <li className='font-semibold'>
                <Link to="/" className='text-stone-800 hover:text-orange-500 hover:font-bold'>Shop</Link>
              </li>
              <li className='font-semibold'>
                <a href="#" className='text-stone-800 hover:text-orange-500 hover:font-bold'>On Sale</a>
              </li>
              <li className='font-semibold'>
                <Link to="/arrival" className='text-stone-800 hover:text-orange-500 hover:font-bold'>New Arrivals</Link>
              </li>
              <li className='font-semibold'>
                <Link to="/faq" className='text-stone-800 hover:text-orange-500 hover:font-bold'>FAQ</Link>
              </li>
            </ul>
          </div>
          <div className="lg:flex md:hidden hidden lg:w-[30%] bg-gray-50 mt-5 md:w-[50%] rounded-full h-[40px] items-center gap-4 border border-gray-300 px-3">
            <BsSearch className='hidden lg:block text-stone-800' />
            <input
              className="hidden lg:block md:hidden py-2 bg-transparent outline-none px-3 w-[70%] rounded-full text-stone-800 placeholder-stone-500"
              type="text"
              placeholder="Search by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {searchQuery && (
            <div className="absolute bg-white mt-20 overflow-y-auto h-[300%] p-2 shadow-md rounded-md border border-gray-300">
              {filteredProducts.length > 0 ? (
                <ul>
                  {filteredProducts.map((product) => (
                    <li key={product._id} className="py-2 px-4 cursor-pointer hover:bg-gray-100">
                      <div onClick={() => handleFilteredProducts(product)} className="text-stone-800">
                        {product.name}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="py-2 px-4 text-stone-800">No products found</p>
              )}
            </div>
          )}

          <div onClick={handleCartRoute} className="flex hidden lg:block gap-7 mt-3 cursor-pointer items-center me-5 relative">
            <FaCartShopping className="mt-5 hidden lg:block text-stone-800" size={20} />
            <span className="absolute top-5 left-3 bg-orange-500 rounded-full text-[8px] text-white w-4 h-4 flex items-center justify-center">
              <span className='hidden lg:block'>{totalProduct}</span>
            </span>
          </div>

          <Link
            to="/login"
            className="hidden lg:block border me-5 mt-6 w-[150px] font-semibold border-none text-center py-1 hover:text-white rounded-[6px] bg-orange-500 hover:bg-orange-600 text-white"
          >
            Log in
          </Link>
          <button ref={trigger} onClick={() => setDropdownOpen(!dropdownOpen)} className='lg:hidden block mt-1 text-stone-800 z-50 font-bold'>
            {openToggle ? <FaBars /> : <IoMdClose />}
          </button>
          {dropdownOpen && (
            <div ref={dropdown} className="absolute bg-white w-48 mt-2 p-2 shadow-md lg:hidden">
              <Upbar allProducts={allProducts} />
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
