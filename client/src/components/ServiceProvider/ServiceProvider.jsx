import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { vendorData, providerData, categoryData } from '../data'
import ServiceCard from '../ServiceCard/ServiceCard'
import { MdArrowForwardIos } from 'react-icons/md'
import Filter from '../Filter/Filter'
import BookingPage from '../../pages/BookingPage/BookingPage'


const ServiceProvider = () => {
    // const navigate=useNavigate();
    const location = useLocation();
    console.log(location.state.myData)
    // console.log(location.state.work)
    // console.log("aaaaa")
    // const checkWork=location.state.myData.providerData.map((val,ind)=>val.work)
    // const providerDetails = location.state.myData.map((val, ind) => val)

    // console.log("Data is:...",checkWork)
    // console.log("Details is:...",providerDetails)
    return (
        <>
            <Header />
            <div className="outer-div flex text-black">
                <Filter />
                {/* card container start  */}
                <div className="data-display">
                    <div className="info  md:px-12 px-2 pt-6">
                        <span className='text-bannerText font-bold'>Category{<MdArrowForwardIos className='inline ml-1' />}  {location.state.work}</span>
                    </div>
                    <div className='grid grid-cols-3 relative'>
                        {/* {providerData.filter((val)=>{
            return(val.work===location.state.category)
        })} */}
                        {location.state.myData.filter((val) => {
                            console.log("Inside Filter function", val.work)
                            console.log("Inside Filter function1", location.state.work)
                            return (val.work === location.state.work)
                        }).map((val, index) => {
                            // console.log("data inside map func:",val)
                            return (
                                <ServiceCard
                                    key={index}
                                    name={`${val.firstName} ${val.lastName}`}
                                    location={`${val.city}, ${val.state}`}
                                    imgUrl={val.photo}
                                    title={val.title}
                                    email={val.email}
                                    phone={val.phone}
                                    rating={val.rating}
                                    work={val.work}
                                    price={val.amount}
                                    age={val.age}
                                    status={val.status}
                                />
                            )
                        })
                        }

                        {/* <div className='absolute min-h-[100vh] w-full' style={{display:location.state.display}}>
        <BookingPage/>
        </div> */}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ServiceProvider