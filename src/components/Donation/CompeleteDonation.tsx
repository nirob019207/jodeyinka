import React from 'react'
import check from "@/asset/check.svg"
import confetti from "@/asset/confetti.svg"
import Image from 'next/image'
import Link from 'next/link'
const CompeleteDonation = () => {
  return (
    <div>
        <div className="relative flex justify-center items-center min-h-screen bg-gray-100 overflow-hidden">
      {/* Confetti Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${confetti.src})`, 
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Payment Box */}
      <div className="relative z-10 bg-white rounded-lg shadow-lg p-8 text-center max-w-md w-full">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <Image src={check} alt="Check" width={50} height={50} />
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-[#090043] mb-4">
          Donation Payment Successful!
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-base md:text-lg">
          Your donation payment was successful! Thank you for your transaction; a
          confirmation has been sent to your email.
        </p>

        {/* Back to Home Link */}
        <div className="mt-8">
          <Link
            href="/"
            className="text-blue-600 hover:underline text-lg font-medium"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
    </div>
  )
}

export default CompeleteDonation