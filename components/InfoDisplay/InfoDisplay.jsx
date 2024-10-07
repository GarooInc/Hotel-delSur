"use client";
import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';
import { useTranslation } from 'react-i18next';

const InfoDisplay = ({ collection }) => {
    const [data, setData] = useState([]);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const pb = new PocketBase(backendUrl)

    pb.autoCancellation(false);

    const { i18n } = useTranslation();
    const currentLocale = i18n.language;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const records = await pb.collection(collection).getFullList({
                    sort: 'id_number',
                });
                setData(records);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center gap-4 py-10 md:w-3/4 px-10 w-full">
            {
                data.map((item, index) => (
                    <div className="collapse collapse-arrow border-b border-cream w-full rounded-none" key={index}>
                        {/* Cambiado a checkbox */}
                        <input type="checkbox" className="peer" />
                        <div className="collapse-title text-xl font-medium text-secondary font-tiempos peer-checked:collapse-open">
                            {item[`title_${currentLocale}`]}
                        </div>
                        <div className="collapse-content peer-checked:collapse-open">
                            <p className='text-secondary font-futura infodisplay'
                                dangerouslySetInnerHTML={{ __html: item[`desc_${currentLocale}`] }}>
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default InfoDisplay;