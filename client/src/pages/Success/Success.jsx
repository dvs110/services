import React from 'react'
import { Footer, Header } from '../../components'

const Success = () => {
    return (
        <div style={{ color: "green" }}>
            <Header />
            <p style={{ marginTop: "6rem", marginBottom: "8rem", fontSize: "5rem", marginLeft: "16rem" }}>Your payment is successful!!</p>

            <Footer />
        </div>
    )
}

export default Success
