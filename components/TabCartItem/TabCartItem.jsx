"use client";
import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';
import { useCart } from '@/contexts/CartContext';
import CartNotification from '@/components/CartNotification/CartNotification';
import { useTranslation } from 'react-i18next';

const TabCartItem = ({ collection }) => {
    const [items, setItems] = useState([]);
    const [notification, setNotification] = useState(false);
    const [actualProduct, setActualProduct] = useState({});
    const [filter, setFilter] = useState(null);
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    const { dispatch } = useCart();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const pb = new PocketBase(`${backendUrl}`);
    pb.autoCancellation(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const records = await pb.collection(collection).getFullList({
                    sort: '-created',
                });
                setItems(records);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    const addToCart = (item) => {
        const updatedItem = {
            ...item,
            Variant: "",
            Price: item.price,
        };
        dispatch({ type: 'ADD_ITEM', payload: updatedItem });
        setNotification(true);
        setActualProduct(updatedItem);
        setTimeout(() => {
            setNotification(false);
        }, 3000);
    };

    const uniqueTags_es = [...new Set(items?.map(item => item.tag_es))];
    const uniqueTags_en = [...new Set(items?.map(item => item.tag_en))];
    const filteredItems = filter !== null ? items.filter(item => item.tag_es === filter || item.tag_en === filter) : items;

    return (
        <div className='flex flex-col gap-10'>
            <div className='flex gap-4 justify-center items-center md:flex-row flex-col'>
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
            <div className="tabCart_container">
                {filteredItems.map((item, index) => (
                    <div key={index} className={`bg-white px-4 pb-16 gap-2 flex flex-col relative min-w-60 ${(index + 1) % 4 !== 0 ? 'md:border-r md:border-black' : ''} ${(index + 1) % 2 !== 0 ? 'md:border-r md:border-black' : ''}`}>
                        <img className="tabCart_img" src={`${backendUrl}/api/files/${item.collectionId}/${item.id}/${item.image}?token=`} alt={item.name} />
                        {
                            item[`title_${currentLocale}`] && (
                                <h3 className="tabCart_title">{item[`title_${currentLocale}`]}</h3>
                            )
                        }
                        {
                            item[`desc_${currentLocale}`] && (
                                <p className="text-black text-md font-futuralight leading-6 tracking-tight" dangerouslySetInnerHTML={{ __html: item[`desc_${currentLocale}`] }}></p>
                            )
                        }
                        {
                            item.price != 0 && (
                                <p className="text-light-brown text-xs  leading-none font-futura font-bold"> ¢{item.price}</p>
                            )
                        }
                        <button className='secondary_button w-[200px] absolute bottom-4' onClick={() => addToCart(item)}>{t('general:services')}</button>
                    </div>
                ))}
                {notification && <CartNotification productName={actualProduct.title} productImage={`${backendUrl}/api/files/${actualProduct.collectionId}/${actualProduct.id}/${actualProduct.image}?token=`} productVariant={actualProduct.Variant} />}
            </div>
        </div>
    );
};

export default TabCartItem;