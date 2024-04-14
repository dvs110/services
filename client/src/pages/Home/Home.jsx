import React from 'react'
import { Header, Nav, Banner, Categories, Vendor, ChooseUs, Testimonial, Statics, Jobs, Footer } from '../../components'

const Home = () => {
  return (
    <>
      {/* <HeaderToggle/> */}
      <Header />
      <Banner />
      <Categories />
      <Vendor />
      <ChooseUs />
      <Testimonial />
      <Statics />
      {/* <Jobs/> */}
      <Footer />
      {/* <Nav/> */}
    </>
  )
}

export default Home