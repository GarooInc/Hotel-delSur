"use client";
import React, { useState, useEffect, useRef } from 'react';
import PocketBase from 'pocketbase';
import { useCart } from '@/contexts/CartContext';
import CartNotification from '@/components/CartNotification/CartNotification';
import { useTranslation } from 'react-i18next';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Menu = () => {
    const [food, setFood] = useState([]);
    const [notification, setNotification] = useState(false);
    const [actualProduct, setActualProduct] = useState({});
    const [prices, setPrices] = useState({}); 
    const [selectedVariants, setSelectedVariants] = useState({});
    const [filter, setFilter] = useState(null);
    const { dispatch } = useCart();
    const { i18n } = useTranslation();
    const currentLocale = i18n.language;

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const pb = new PocketBase(backendUrl);
    pb.autoCancellation(false);

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
            Title: item[`title_${currentLocale}`],
            Variant: selectedVariants[item.id],
            Price: prices[item.id] || item.price,
        };
        dispatch({ type: 'ADD_ITEM', payload: updatedItem });
        setNotification(true);
        setActualProduct(updatedItem);
        setTimeout(() => {
            setNotification(false);
        }, 3000);
    };

    const uniqueTags_es = [...new Set(food?.map(item => item.tag_es))];
    const uniqueTags_en = [...new Set(food?.map(item => item.tag_en))];
    const filteredItems = filter !== null ? food.filter(item => item.tag_es === filter || item.tag_en === filter) : food;

    const scrollContainerRef = useRef(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    return (
        <div className='flex flex-col gap-10 pt-10 pb-20 md:px-10 px-8 w-full'>
            <div className="relative w-full">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-white to-transparent h-full w-10 z-1 flex items-center justify-start cursor-pointer" onClick={scrollLeft}>
                    <IoIosArrowBack className="text-gray-500" />
                </div>
                <div className="w-full overflow-x-auto" ref={scrollContainerRef}>
                    <div className='flex gap-4 justify-start items-center w-max whitespace-nowrap px-10'>
                        {
                            currentLocale === 'es' ? uniqueTags_es.map((tag, index) => (
                                <button key={index} className={`button_line ${filter === tag ? 'bg-secondary text-white' : 'text-secondary'}`} onClick={() => setFilter(tag)}>
                                    {tag}
                                </button>
                            )) : uniqueTags_en.map((tag, index) => (
                                <button key={index} className={`button_line ${filter === tag ? 'bg-secondary text-white' : 'text-secondary'}`} onClick={() => setFilter(tag)}>
                                    {tag}
                                </button>
                            ))
                        }
                    </div>
                </div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-l from-white to-transparent h-full w-10 z-1 flex items-center justify-end cursor-pointer" onClick={scrollRight}>
                    <IoIosArrowForward className="text-gray-500" />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 grid-flow-row-dense auto-rows-auto">
                {filteredItems.map((item, index) => (
                    <div key={index} className={`bg-white px-2 pb-12 shadow rounded-lg gap-2 flex flex-col relative ${index % 3 === 0 ? 'mb-6 md:m-0 ' : ''}`}>
                        <h3 className="text-black text-base leading-tight font-futura mt-2">{item[`title_${currentLocale}`]}</h3>
                        <p className="text-black text-xs font-[futura light] leading-none">{item[`desc_${currentLocale}`]}</p>
                        <p className="text-black text-xs font-light leading-none font-futura absolute bottom-2 left-2"> ₡{prices[item.id] || item.price}</p>
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
                        <button className="rounded shadow justify-start items-center text-xs inline-flex font-futura bg-primary text-black px-2 py-1 absolute bottom-2 right-2" onClick={() => addToCart(item)}>Add to cart</button>
                    </div>
                ))}
                {notification && <CartNotification productName={actualProduct[`title_${currentLocale}`]} productVariant={actualProduct.variant} />}
            </div>
        </div>
    );    
}
export default Menu;