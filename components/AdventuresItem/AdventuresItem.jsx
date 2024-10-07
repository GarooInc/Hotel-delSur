"use client";
import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const AdventuresItem = () => {
    const [adventures, setAdventures] = useState([]);

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const pb = new PocketBase(backendUrl)
    pb.autoCancellation(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const records = await pb.collection('Top_Five_Adventures').getFullList({
                    sort: '-created',
                });
                console.log(records);
                setAdventures(records);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);


    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 grid-flow-row-dense auto-rows-auto py-10 md:px-10">
            {adventures.map((item, index) => (
                <div key={index} className={`bg-white px-2 pb-16 shadow rounded-lg gap-2 flex flex-col relative`}>
                    <img className="md:w-full md:h-32 w-full h-48 md:h-52 rounded-lg object-cover" src={`backendUrl/api/files/${item.collectionId}/${item.id}/${item.image}?token=`} alt={item.name} />
                    <h3 className="text-black text-xl leading-tight font-futura mt-2">{item.title}</h3>
                    <p className="text-black text-md font-futuralight leading-6 tracking-tight">{item.short_Description}</p>
                    <p className="text-black text-xs font-light leading-none font-futura absolute bottom-2 left-2"> £{item.price}</p>
                    <button className='text-white bg-aqua p-2 rounded  absolute bottom-2 right-2 font-futura'>Request a reservation</button>
                </div>
            ))}
        </div>
    );
};

export default AdventuresItem
