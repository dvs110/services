// import React, { useEffect, useState } from 'react'
// import { Footer, Header } from '../../components'

// const Success = () => {
//     const [data, setData] = useState({
//         productName: "",
//     })
//     useEffect(() => {
//         // Extracting query parameters from the URL
//         const params = new URLSearchParams(window.location.search);
//         const productName = params.get('product');
//         const amount = params.get('amount');
//         setData({ productName });
//         // Process payment details here...
//         console.log("Product:", productName);
//         console.log("Amount:", amount);
//     }, []);

//     return (
//         <div style={{ color: "green" }}>
//             <Header />
//             <p style={{ marginTop: "6rem", marginBottom: "8rem", fontSize: "5rem", marginLeft: "16rem" }}>Your payment is successful!! {data.productName}</p>

//             <Footer />
//         </div>
//     )
// }

// export default Success



// import React, { useState, useEffect } from 'react';
// import { Footer, Header } from '../../components';

// const Success = () => {
//     const [subtotal, setSubtotal] = useState(0);
//     const [taxRate, setTaxRate] = useState(0.18); // 18% GST
//     const [total, setTotal] = useState(0);
//     const [productName, setProductName] = useState("");

//     useEffect(() => {
//         // Extracting query parameters from the URL
//         const params = new URLSearchParams(window.location.search);
//         const productName = params.get('product');
//         const amount = parseFloat(params.get('amount'));
//         setSubtotal(amount);
//         setTotal(amount + (amount * taxRate));
//         setProductName(productName);
//     }, []);

//     return (
//         <div>
//             <Header />
//             <div className="billing-container">
//                 <h2 style={{ color: 'black' }}>Billing Details</h2>
//                 <div className="billing-inputs">
//                     <label htmlFor="subtotal" style={{ color: 'black' }}>Subtotal ({productName.amount}):</label>
//                     <input type="number" id="subtotal" value={subtotal} readOnly style={{ color: 'black' }} />
//                 </div>
//                 <div className="billing-details">
//                     <div>
//                         <p style={{ color: 'black' }}>Subtotal: ${subtotal.toFixed(2)}</p>
//                         <p style={{ color: 'black' }}>GST ({(taxRate * 100).toFixed(2)}%): ${(subtotal * taxRate).toFixed(2)}</p>
//                         <p style={{ color: 'black' }}>Total: ${total.toFixed(2)}</p>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default Success;




// BillingPage.js
import React, { useState, useEffect } from 'react';
import { Footer, Header } from '../../components';
import './Success.css';

const Success = () => {
    const [subtotal, setSubtotal] = useState(0);
    const [taxRate, setTaxRate] = useState(0.18); // 18% GST
    const [total, setTotal] = useState(0);
    const [productName, setProductName] = useState("");
    const [serviceprovider, setserviceprovider] = useState("");
    useEffect(() => {
        // Extracting query parameters from the URL
        const params = new URLSearchParams(window.location.search);
        const productName = params.get('product');
        const serviceprovider = params.get('name');
        const amount = parseFloat(params.get('amount'));
        setSubtotal(amount / 100);
        setTotal((amount / 100) + ((amount / 100) * taxRate));
        setProductName(productName);
        setserviceprovider(serviceprovider);
    }, []);

    const handleSubtotalChange = (e) => {
        const value = parseFloat(e.target.value);
        setSubtotal(value);
        const taxAmount = value * taxRate;
        setTotal(value + taxAmount);
    };

    return (
        <div className="billing-page" >
            <Header />
            <p style={{ marginTop: "6rem", marginBottom: "2rem", fontSize: "3rem", marginLeft: "22rem", color: "Green" }}>Congratulations, your payment is successful!!</p>

            <div className="billing-container" style={{ marginBottom: "1rem" }}>
                <h2 className="billing-heading">Billing Details</h2>
                <div className="billing-input">
                    {/* <label htmlFor="subtotal" style={{ color: 'black' }}>Subtotal ({productName}):</label> */}
                    <div className="summary-item total">

                        <span style={{ color: 'black', marginLeft: '0rem', fontSize: "2rem", paddingLeft: "4rem", paddingRight: "4rem" }}>Your Bill</span>
                    </div>
                </div>
                <div className="billing-summary">
                    <div className="summary-item">
                        <span style={{ color: 'black' }}>Service:</span>
                        <span style={{ color: 'black' }}>{productName}</span>
                    </div>
                    <div className="summary-item">
                        <span style={{ color: 'black' }}>Service Provider:</span>
                        <span style={{ color: 'black' }}>{serviceprovider}</span>
                    </div>
                    <div className="summary-item">
                        <span style={{ color: 'black' }}>Subtotal:</span>
                        <span style={{ color: 'black' }}>{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-item">
                        <span style={{ color: 'black' }}>GST:</span>
                        <span style={{ color: 'black' }}>{(subtotal * taxRate).toFixed(2)}</span>
                    </div>
                    <div className="summary-item">
                        <span style={{ color: 'black' }}>Service Charge: </span>
                        <span style={{ color: 'black' }}> 50</span>
                    </div>
                    <div className="summary-item total">
                        <span style={{ color: 'black' }}>Total:</span>
                        <span style={{ color: 'black' }}>{(total + 50).toFixed(2)}</span>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Success;
