"use client";
import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';
import { MdLocationPin } from "react-icons/md";
import { TbClockHour3Filled } from "react-icons/tb";
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';


const FoodDrinksItem = () => {
    const [foodDrinks, setFoodDrinks] = useState([]);

    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const pb = new PocketBase(backendUrl)
    pb.autoCancellation(false)

    const openPdf = (item) => {
        window.open(`${backendUrl}/api/files/${item.collectionId}/${item.id}/${item.menu_pdf}?token=`);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const records = await pb.collection('Food_Drinks').getFullList({
                    sort: 'order_num',
                });
                setFoodDrinks(records);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);


    return (
        <div className="flex flex-col gap-4 w-full pb-10">
            {foodDrinks.map((item, index) => (
                <div key={index} className={`rounded-b-2xl gap-2 flex flex-col w-full`}>
                    <div className='relative w-full'>
                        <img className="w-full h-96 rounded-b-2xl object-cover relative" src={`${backendUrl}/api/files/${item.collectionId}/${item.id}/${item.cover_img}?token=`} alt={item.name} />
                        <div className="z-2 absolute bottom-0 left-0 backdrop-blur-lg rounded-b-2xl bg-black bg-opacity-50 w-full h-20 flex flex-col justify-center items-start p-4 gap-4">
                                <h3 className="text-white text-xl leading-tight font-futura mt-2">{item.name}</h3>
                                <p className="text-white text-md font-futuralight leading-none flex gap-2">
                                    <MdLocationPin className="text-primary" />
                                    {item[`location_${currentLocale}`]}
                                </p>
                        </div>
                    </div>
                    <div className='flex flex-col px-2'>
                        <div className='flex gap-2 justify-end items-center'>
                            <TbClockHour3Filled className="text-primary" />
                            <span className='food_drinks_text'>
                            {item[`schedule1_${currentLocale}`] && (
                                <span>
                                    {item[`schedule1_${currentLocale}`]} 
                                    {item[`schedule2_${currentLocale}`] ? ` - ${item[`schedule2_${currentLocale}`]}` : ''}
                                </span>
                            )}
                            </span>
                        </div>
                        <div className='flex flex-col gap-4 border-b border-primary pb-4'>
                            <h3 className="text-black text-base leading-tight font-futura mt-2">{t('food_drinks:desc')}</h3>
                            <span className='food_drinks_text'>{item[`description_${currentLocale}`]}</span>
                            <button className='text-white bg-primary p-2 rounded md:w-40' onClick={() => openPdf(item)}>Menú</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FoodDrinksItem
