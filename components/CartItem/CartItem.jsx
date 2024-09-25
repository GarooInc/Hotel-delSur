"use client"
import React, {useState, useEffect} from 'react'
import { useCart } from '@/contexts/CartContext'
import { MdCancel } from "react-icons/md"
import { useRouter } from "next/navigation"


const CartItem = () => {
    const { state } = useCart()
    const { dispatch } = useCart()
    const router = useRouter()

    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState({
        phone : '',
        family : '',
        room : '',
    })
    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onHandleSubmit = async (event) => {
        console.log(form)
        console.log(state.items)

        const items = state.items.map(item => ({
            "itemName" : item.Title,
            "variant" : item.Variant,
            "price" : parseFloat(item.Price),
            "quantity" : item.quantity

        }))

        event.preventDefault()
        const response = await fetch('https://garoo-hotel-orders.koyeb.app/kaana/api/v1/orders',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contact: form.phone,
                family: form.family,
                room: parseInt(form.room, 10),
                items: items
            })
        })

        if(response.ok){
            console.log('Order created')
            setMessage('Order created successfully')
            dispatch({ type: 'LOAD_ITEMS', payload: [] })
            setShowForm(false)
        }
            else {
                setMessage('Error creating order')
                console.log('Error')
            }
        }

        const onHandleClose = () => {
            setShowForm(false)
            router.push('/roomservice')
        }





    return (
        <div className="cart-container">
            <h1 className='principal_title'>Cart</h1>
            {state.items.length > 0 ? (
                <ul className='py-10 grid grid-cols-2 gap-4'>
                    {state.items.map((item, index) => (
                        <li key={index} className='bg-white px-2 pb-12 shadow rounded-lg gap-2 flex flex-col relative'>
                            <button className="rounded shadow justify-start items-center text-xs inline-flex font-futura bg-redorange text-white px-2 py-1 absolute left-2" onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item })}>X</button>
                            <img className="md:w-full md:h-32 w-40 h-48 rounded-lg object-cover" src={`https://kaana.garooinc.com/kaana/api/files/${item.collectionId}/${item.id}/${item.Image}?token=`} alt={item.name} />
                            <h3 className="text-black text-base leading-tight font-futura mt-2  w-full gap-4 flex">{item.Title} <span className='text-aqua'>£{item.Price}</span></h3>
                            <p className="text-black text-xs font-futura leading-none">{item.Description}</p>
                            {
                                item.variant && (
                                    <p className='text-gray text-xs font-futura leading-none'>Variant: {item.Variant}</p>
                                )
                            }
                            <div className="flex justify-between items-center absolute bottom-2">
                                <div className="flex justify-between items-center shadow-xl w-full">
                                        <button className="rounded shadow justify-start items-center text-xs inline-flex font-futura  text-aqua px-2 py-1" onClick={() => dispatch({ type: 'DECREASE_ITEM', payload: item })}>-</button>
                                        <p className="text-black text-xs font-futura leading-none px-4">{item.quantity}</p>
                                        <button className="rounded shadow justify-start items-center text-xs inline-flex font-futura text-aqua px-2 py-1" onClick={() => dispatch({ type: 'INCREASE_ITEM', payload: item })}>+</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-center font-futura'>Your cart is empty</p>
            )}
            {state.items.length > 0 && (
                <button className="rounded shadow justify-start items-center text-xs inline-flex font-futura bg-aqua text-white px-6 py-3 fixed bottom-2 right-2" onClick={() => setShowForm(true)}>Checkout</button>
            )}
            {
                showForm && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white rounded-lg p-6 w-80">
                            <div className="flex justify-between">
                                <h2 className="text-black text-base font-futura leading-tight">Checkout</h2>
                                <button onClick={() => setShowForm(false)}><MdCancel className="text-black text-2xl" /></button>
                            </div>
                            <form className="flex flex-col gap-4 mt-4">
                                <input type="text" placeholder="Phone" className="rounded shadow p-2" onChange={handleChange} name="phone" />
                                <input type="text" placeholder="Family" className="rounded shadow p-2" onChange={handleChange} name="family" />
                                <input type="text" placeholder="Room" className="rounded shadow p-2" onChange={handleChange} name="room" />
                                <button className="rounded shadow bg-aqua text-white p-2" onClick={(e) => onHandleSubmit(e)}>Submit</button>
                            </form>
                        </div>
                    </div>
                )
            }
            {
                message && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white rounded-lg p-6 w-80 flex flex-col justify-center items-center relative">
                            <button onClick={() => onHandleClose()}><MdCancel className="text-black text-2xl absolute top-2 right-2" /></button>
                            <p className="text-black text-base font-futura leading-tight">{message}</p>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default CartItem