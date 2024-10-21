"use client";
import React, {useContext, useState} from 'react'
import { useRouter } from "next/navigation"
import FooterItem from '@/components/FooterItem/FooterItem'
import CartItem from '@/components/CartItem/CartItem'
import { useCart } from '@/contexts/CartContext';
import { CgHome, CgShoppingCart } from 'react-icons/cg'



const FooterCart = () => {
    const router = useRouter()
    const [showCart, setShowCart] = useState(false)
    const { state } = useCart()
    const itemCount = state.items.reduce((acc, item) => acc + item.quantity, 0)

    const handleShowCart = () => {
        setShowCart(!showCart)
    }

  return (
    <div className='fixed bottom-0 w-full'>
        <div className="absolute bottom-24 right-10 flex justify-evenly pt-4" >
            <CgHome className="text-3xl text-black" onClick={() => router.push('/')} />
            <div className="relative">
                <CgShoppingCart className="text-3xl text-black" onClick={handleShowCart} />
                    {itemCount > 0 && (
                        <span className="cart_bubble">
                            {itemCount}
                        </span>
                    )}
            </div>
        </div>
        <FooterItem />
        {showCart && <div className="absolute bottom-0 right-0">
            <CartItem showCart= {handleShowCart} />
        </div>}
    </div>

  )
}

export default FooterCart