// import React from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import Footer from '../Footer/Footer'
// import Header from '../Header/Header'
// import { vendorData, providerData, categoryData } from '../data'
// import ServiceCard from '../ServiceCard/ServiceCard'
// import { MdArrowForwardIos } from 'react-icons/md'
// import Filter from '../Filter/Filter'
// import BookingPage from '../../pages/BookingPage/BookingPage'


// const ServiceProvider = () => {
//     const location = useLocation();
//     console.log(location.state.myData)

//     return (
//         <>
//             <Header />
//             <div className="outer-div flex text-black">
//                 <Filter />
//                 <div className="data-display">
//                     <div className="info  md:px-12 px-2 pt-6">
//                         <span className='text-bannerText font-bold'>Category{<MdArrowForwardIos className='inline ml-1' />}  {location.state.work}</span>
//                     </div>
//                     <div className='grid grid-cols-3 relative'>

//                         {location.state.myData.filter((val) => {
//                             console.log("Inside Filter function", val.work)
//                             console.log("Inside Filter function1", location.state.work)
//                             return (val.work === location.state.work)
//                         }).map((val, index) => {
//                             return (
//                                 <ServiceCard
//                                     key={index}
//                                     name={`${val.firstName} ${val.lastName}`}
//                                     location={`${val.city}, ${val.state}`}
//                                     imgUrl={val.photo}
//                                     title={val.title}
//                                     email={val.email}
//                                     phone={val.phone}
//                                     rating={val.rating}
//                                     work={val.work}
//                                     price={val.amount}
//                                     age={val.age}
//                                     status={val.status}
//                                 />
//                             )
//                         })
//                         }
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     )
// }

// export default ServiceProvider




import React from 'react'
import { useLocation } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import ServiceCard from '../ServiceCard/ServiceCard'
import { MdArrowForwardIos } from 'react-icons/md'
import Filter from '../Filter/Filter'

const ServiceProvider = () => {
    const location = useLocation();
    const serviceProviders = location.state.myData;

    // Function to calculate the average rating
    const calculateAverageRating = (ratings) => {
        if (ratings.length === 0) return 0;
        const total = ratings.reduce((sum, rating) => sum + parseFloat(rating), 0);
        const average = total / ratings.length;
        return average;
    };

    // Filter and sort service providers by work and average rating
    const filteredAndSortedProviders = serviceProviders
        .filter(val => val.work === location.state.work)
        .map(provider => ({
            ...provider,
            averageRating: calculateAverageRating(provider.rating),
        }))
        .sort((a, b) => b.averageRating - a.averageRating);

    return (
        <>
            <Header />
            <div className="outer-div flex text-black">
                <Filter />
                <div className="data-display">
                    <div className="info md:px-12 px-2 pt-6">
                        <span className='text-bannerText font-bold'>Category{<MdArrowForwardIos className='inline ml-1' />}  {location.state.work}</span>
                    </div>
                    <div className='grid grid-cols-3 relative'>
                        {filteredAndSortedProviders.map((val, index) => (
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
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ServiceProvider;
