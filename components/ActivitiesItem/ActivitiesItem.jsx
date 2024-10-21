"use client";
import React, {useState, useEffect} from 'react'
import PocketBase from 'pocketbase'
import { FaLocationDot } from "react-icons/fa6"
import { FaRegCalendar } from "react-icons/fa6"
import { FaMoneyBill } from 'react-icons/fa'
import { FaClock } from 'react-icons/fa';
import { useTranslation } from 'react-i18next'



const ActivitiesItem = () => {
    const [activities, setActivities] = useState([])
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;


    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const pb = new PocketBase(backendUrl)
    pb.autoCancellation(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const records = await pb.collection('Activities_Calendar').getFullList({
                    sort: '-created',
                });
                console.log(records)
                setActivities(records);
            } catch (error) {
                console.error("Error fetching data: ", error)
            }
        }

        fetchData()
    }, [])


  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 grid-flow-row-dense auto-rows-auto px-10 py-10">
        { 
            activities.map((item, index) => (
                <div key={index} className={`bg-white h-48 shadow rounded-lg gap-2 flex relative`}>
                    <img className="md:h-full w-48 rounded-lg object-cover" src={`${backendUrl}/api/files/${item.collectionId}/${item.id}/${item.image}?token=`} alt={item.name} />
                    <div className='flex flex-col gap-2  w-3/5'>
                        <h3 className="text-black text-lg leading-tight font-futura mt-2">{item[`title_${currentLocale}`]}</h3>
                        {
                            item.location && (
                                <div className="flex items-center text-black leading-none gap-2">
                                    <FaLocationDot className="icon_activities text-md" />
                                    <p className='text-black text-md font-futuralight leading-6 tracking-tight'>{item.location}</p>
                                </div>
                            )
                        }
                        {
                            item[`date_${currentLocale}`] && (
                                <div className="flex items-center text-black leading-none gap-2">
                                    <FaRegCalendar className="icon_activities text-md" />
                                    <p className='text-black text-md font-futuralight leading-6 tracking-tight'>{item[`date_${currentLocale}`]}</p>
                                </div>
                            )
                        }
                        {
                            item.price != 0 && (
                                <div className="flex items-center text-black leading-none gap-2">
                                    <FaMoneyBill className="icon_activities text-md" />
                                    <p className='text-black text-md font-futuralight leading-6 tracking-tight'>{item.price}</p>
                                </div>
                            )
                        }
                        {
                            item.time && (
                                <div className="flex items-center text-black leading-none gap-2">
                                    <FaClock className="icon_activities text-md" />
                                    <p className='text-black text-md font-futuralight leading-6 tracking-tight'>{item.time}</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default ActivitiesItem