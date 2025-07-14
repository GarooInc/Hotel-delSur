import React from 'react'
import PocketBase from 'pocketbase'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

const ExperienceInnerItem = ({experienceId}) => {
    const [experience, setExperience] = useState('')
    const [loading, setLoading] = useState(true)
    const { i18n } = useTranslation();
    const currentLocale = i18n.language;
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const pb = new PocketBase(backendUrl)
    pb.autoCancellation(false)

    const current = experienceId

    useEffect(() => {
        const fetchData = async () => {
            try {
                const record = await pb.collection('amenities').getOne(current)
                setExperience(record);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData()
    }, [current]);

  return (
    <div className="w-full">
        {
            loading ? <span className="loading loading-spinner loading-sm"></span>            : (
                <div className='md:flex flex-col md:flex-row justify-center w-full items-stretch'>
                    <div className='md:w-1/2'>
                        <img className="w-full object-cover" src={`${backendUrl}/api/files/${experience.collectionId}/${experience.id}/${experience.image}?token=`} alt={experience.name} />
                    </div>
                    <div className='p-10 bg-cream md:min-h-full md:w-1/2 flex flex-col justify-center'>
                        <h1 className="text-2xl md:text-4xl text-start text-primary font-futura font-bold">{experience.title}</h1>
                        <div className="text-black md:px-0 gap-4 flex flex-col experiences" dangerouslySetInnerHTML={{ __html: experience[`description_${currentLocale}`] }}></div>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default ExperienceInnerItem