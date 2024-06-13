'use client';

import React, { useState } from 'react';
import QRCode from 'react-qr-code';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('visa');
  const [visaDetails, setVisaDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: ''
  });
  const [message, setMessage] = useState('');

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handleVisaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVisaDetails({ ...visaDetails, [name]: value });
  };

  const handlePayment = async () => {
    const paymentData = {
      method: paymentMethod,
      details: visaDetails,
    };

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage(`Payment successful! Payment ID: ${result.paymentId}`);
      } else {
        setMessage(`Payment failed: ${result.message}`);
      }
    } catch (error) {
      setMessage('An error occurred during the payment process.');
    }
  };

  return (
    <div className="min-h-full bg-gray-100 flex items-start justify-center py-10">
      <div className="bg-white shadow-md rounded-lg w-3/4 p-8">
        <h2 className="text-2xl font-semibold mb-6">Payment</h2>
        {message && <div className="mb-6 text-red-600">{message}</div>}
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Order Summary</h3>
          {/* Display the order summary here */}
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Choose Payment Method</h3>
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded ${paymentMethod === 'visa' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => handlePaymentMethodChange('visa')}
            >
              Visa
            </button>
            <button
              className={`px-4 py-2 rounded ${paymentMethod === 'qr' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => handlePaymentMethodChange('qr')}
            >
              QR Code
            </button>
          </div>
        </div>
        {paymentMethod === 'visa' && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Visa Payment</h3>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={visaDetails.cardNumber}
                  onChange={handleVisaInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiryDate">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={visaDetails.expiryDate}
                  onChange={handleVisaInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvv">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={visaDetails.cvv}
                  onChange={handleVisaInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardHolderName">
                  Card Holder Name
                </label>
                <input
                  type="text"
                  id="cardHolderName"
                  name="cardHolderName"
                  value={visaDetails.cardHolderName}
                  onChange={handleVisaInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </form>
          </div>
        )}
        {paymentMethod === 'qr' && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold">QR Code Payment</h3>
            <QRCode value="https://example.com" />
          </div>
        )}
        <div className="flex justify-end">
          <button
            className="px-6 py-2 bg-green-600 text-white rounded-lg"
            onClick={handlePayment}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
