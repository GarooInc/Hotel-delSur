"use client";
import React, {useState, useEffect} from 'react'
import PocketBase from 'pocketbase'
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";



const TvItem = () => {
    const [channels, setChannels] = useState([])

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const pb = new PocketBase(backendUrl)
    pb.autoCancellation(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const records = await pb.collection('Tv_Guide').getFullList({
                    sort: '-created',
                });
                console.log(records)
                setChannels(records);
            } catch (error) {
                console.error("Error fetching data: ", error)
            }
        }

        fetchData()
    }, [])


  return (
    <div className="bg-white shadow rounded-lg gap-2 flex relative flex-col md:w-1/2 w-3/4 p-4">
        { 
            channels.map((item, index) => (
                <div key={index} className="flex gap-4">
                    <span className="text-black text-md leading-tight font-futura mt-2">{item.channel}</span>
                    <span className="text-black text-md leading-tight font-futura mt-2">{item.name}</span>
                </div>
            ))
        }
    </div>
  )
}

export default TvItem