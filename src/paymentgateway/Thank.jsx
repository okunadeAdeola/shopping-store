import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handlePreviousStep } from '../Redux/counterSlice'


const Thank = () => {

    const store = useSelector(state => state.counterReducer.address)
    const navigate = useNavigate()

    const dispatch = useDispatch()
  
    // const catalogue=()=>{
    //     navigate("")
    // }

    const handlePrevious =()=>{
        navigate("/cart")
    }

    return (
        <>
        <div className='lg:w-[175%]  w-[140%] h-screen justify-center items-center'>
         <section className='flex flex-col justify-center items-center h-full mt-[-40px] md:mx-40 mx-20'>
          <div className='text-center text-[15px] font-bold'>
                <p className='my-3'>Enrollment Successful!</p>
                <p className=''>Thanks for shopping with us ......! We hope you have fun using our platform. If you ever need support, please feel free to email us at Okunade288@gmail.com.</p>
                {/* <p>Your Transaction</p> */}
            </div>
            {/* <div className='text-center my-5'>
                <button onClick={() => catalogue()} type='submit' className='bg-bg-orange-500-500  text-white border py-1 px-5 rounded hover:bg-white font-bold hover:text-bg-orange-500-500 border-bg-orange-500-500 '>Go To Shopping</button>
            </div> */}

            <div className='text-center my-5'>
                <button type='submit' onClick={handlePrevious} className='bg-orange-500  text-white border py-1 px-5 rounded hover:bg-orange-600 font-bold hover:text-bg-orange-500-500  border-bg-orange-500-500 '>Go To Previous</button>
            </div>
        </section>
        </div>

        </>
    )
}

export default Thank