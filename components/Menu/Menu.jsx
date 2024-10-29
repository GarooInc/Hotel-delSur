"use client";
import React, { useState, useEffect, useRef } from 'react';
import PocketBase from 'pocketbase';
import { useCart } from '@/contexts/CartContext';
import CartNotification from '@/components/CartNotification/CartNotification';
import { useTranslation } from 'react-i18next';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Menu = ({collection}) => {
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
                const records = await pb.collection(collection).getFullList({
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
        <div className='menu_container'>
            <div className="relative w-full">
                <div className="menu_arrow_left" onClick={scrollLeft}>
                    <IoIosArrowBack className="text-gray-500" />
                </div>
                <div className="w-full overflow-x-auto" ref={scrollContainerRef}>
                    <div className='menu_items_container'>
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
                <div className="menu_arrow_right" onClick={scrollRight}>
                    <IoIosArrowForward className="text-gray-500" />
                </div>
            </div>
            <div className="menu_grid">
                {filteredItems.map((item, index) => (
                    <div key={index} className={`menu_item ${index % 3 === 0 ? 'mb-6 md:m-0 ' : ''}`}>
                        <h3 className="menu_title">{item[`title_${currentLocale}`]}</h3>
                        <p className="menu_desc">{item[`desc_${currentLocale}`]}</p>
                        <p className="menu_price"> ₡{prices[item.id] || item.price}</p>
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
                        <button className="addtocart_button" onClick={() => addToCart(item)}>Add to cart</button>
                    </div>
                ))}
                {notification && <CartNotification productName={actualProduct[`title_${currentLocale}`]} productVariant={actualProduct.variant} />}
            </div>
        </div>
    );    
}
export default Menu;