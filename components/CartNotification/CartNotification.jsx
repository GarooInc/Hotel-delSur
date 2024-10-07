"use client"
import React from 'react'
import { useRouter } from "next/navigation"

const CartNotification = ({productName, productImage, productVariant}) => {
    const router = useRouter()
  return (
    <div className="fixed shadow-lg top-0 right-4 bg-white text-primary p-10 z-10">
        <div className="flex items-center gap-4 flex-col">
            <img src={productImage} alt={productName} className="w-20 h-20 object-cover rounded-lg" />
            <p className="font-futura text-xs">{productName} added to cart</p>
            {
                productVariant && (
                    <p className="font-futura text-xs text-gray-500">Variant: {productVariant}</p>
                )
            }
            <button className="bg-primary text-white rounded-md px-2 py-1 font-futura" onClick={() => router.push('/cart')}>View Cart</button >
        </div>
    </div>
  )
}

export default CartNotification