"use client";
import React, { useState, useEffect } from 'react'
import PocketBase from 'pocketbase'
import { IoIosArrowDropleft } from "react-icons/io"
import { useRouter } from "next/navigation"
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import FooterItem from '@/components/FooterItem/FooterItem'
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const ExperiencePage = ({params}) => {
    const [experience, setExperience] = useState('')
    const router = useRouter()

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const pb = new PocketBase(backendUrl)
    pb.autoCancellation(false)

    const current = params.experienceId
    console.log(current)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const record = await pb.collection('Experiences').getOne(current)
                setExperience(record);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData()
    }, [params.postId])


  return (
    <div className="page bg-white">
        <div className='flex flex-col justify-center items-center w-full relative'>
            <HeaderItem v={"v4"} />
            <div className='flex flex-col justify-center items-center pt-4 w-full'>
                <div className='md:flex flex-col md:flex-row justify-center w-full items-stretch'>
                    <div className='md:w-1/2'>
                        <img className="w-full object-cover" src={`https://kaana.garooinc.com/kaana/api/files/${experience.collectionId}/${experience.id}/${experience.image}?token=`} alt={experience.name} />
                    </div>
                    <div className='p-10 bg-cream md:min-h-full md:w-1/2 flex flex-col justify-center'>
                        <h1 className="text-2xl md:text-4xl text-start text-light-brown font-futura font-bold">{experience.title}</h1>
                        <div className="text-black md:px-0 gap-4 flex flex-col experiences" dangerouslySetInnerHTML={{ __html: experience.description }}></div>
                    </div>
                </div>
            </div>
        </div>
        <FooterItem />
    </div>

  )
}

export default ExperiencePage