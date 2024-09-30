"use client";
import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';
import { useCart } from '@/contexts/CartContext';
import CartNotification from '@/components/CartNotification/CartNotification';
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const Menu = () => {
    const [food, setFood] = useState([]);
    const [notification, setNotification] = useState(false);
    const [actualProduct, setActualProduct] = useState({});
    const [prices, setPrices] = useState({}); 
    const [selectedVariants, setSelectedVariants] = useState({});
    const { dispatch } = useCart();

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const pb = new PocketBase(backendUrl)
    pb.autoCancellation(false)

    const selectVariant = (e, itemId) => {
        const selectedValue = e.target.value;
        setPrices(prevPrices => ({
            ...prevPrices,
            [itemId]: selectedValue,
        }));
        setSelectedVariants(prevVariants => ({
            ...prevVariants,
            [itemId]: e.target.selectedOptions[0].text,
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const records = await pb.collection('Room_Service').getFullList({
                    sort: '-created',
                });
                console.log(records);
                setFood(records);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    const addToCart = (item) => {
        const updatedItem = {
            ...item,
            Variant: selectedVariants[item.id],
            Price: prices[item.id] || item.Price,
        };
        dispatch({ type: 'ADD_ITEM', payload: updatedItem });
        setNotification(true);
        setActualProduct(updatedItem);
        setTimeout(() => {
            setNotification(false);
        }, 3000);
    };

    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 grid-flow-row-dense auto-rows-auto py-20 px-10">
            {food.map((item, index) => (
                <div key={index} className={`bg-white px-2 pb-12 shadow rounded-lg gap-2 flex flex-col relative ${index % 3 === 0 ? 'mb-6 md:m-0 ' : ''}`}>
                    <img className="md:w-full md:h-32 w-40 h-48 rounded-lg object-cover" src={`https://kaana.garooinc.com/kaana/api/files/${item.collectionId}/${item.id}/${item.Image}?token=`} alt={item.name} />
                    <h3 className="text-black text-base leading-tight font-futura mt-2">{item.Title}</h3>
                    <p className="text-black text-xs font-[futura light] leading-none">{item.Description}</p>
                    <p className="text-lightgray text-xs font-light leading-none font-futura absolute bottom-2 left-2"> £{prices[item.id] || item.Price}</p>
                    {item.Variants && (
                        <div className='flex flex-col'>
                            <label className="text-sm font-futura text-black mt-2">Variants</label>
                            <select className="bg-white font-futura text-xs" onChange={(e) => selectVariant(e, item.id)}>
                                {Object.entries(item.Variants).map(([key, value]) => (
                                    <option key={key} value={value}>
                                        {`${key} - £${value}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <button className="rounded shadow justify-start items-center text-xs inline-flex font-futura bg-light-brown text-lightgray px-2 py-1 absolute bottom-2 right-2" onClick={() => addToCart(item)}>Add to cart</button>
                </div>
            ))}
            {notification && <CartNotification productName={actualProduct.Title} productImage={`https://kaana.garooinc.com/kaana/api/files/${actualProduct.collectionId}/${actualProduct.id}/${actualProduct.Image}?token=`} productVariant={actualProduct.Variant} />}
        </div>
    );
};

export default Menu
