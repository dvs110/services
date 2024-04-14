import React from 'react'
import { Footer, Header } from '../../components'

const Cancel = () => {
    return (
        <div style={{ color: "red" }}>
            <Header />
            <p style={{ marginTop: "6rem", marginBottom: "8rem", fontSize: "5rem", marginLeft: "16rem" }}>Sorry, your payment is failed!!</p>

            <Footer />
        </div>
    )
}

export default Cancel
