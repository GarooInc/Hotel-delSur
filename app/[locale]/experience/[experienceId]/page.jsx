"use client";
import React, { useState, useEffect } from 'react'
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import FooterItem from '@/components/FooterItem/FooterItem'
import TranslationsProvider from '@/components/TranslationsProvider'
import initTranslations from '@/app/i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';
import ExperienceInnerItem from '@/components/ExperienceInnerItem/ExperienceInnerItem';

const namespaces = ['experience', 'header'];
export default function Experience({ params: { locale, experienceId }}) {
    const [translations, setTranslations] = useState({ t: () => '', resources: {} });

    // Carga las traducciones
    useEffect(() => {
      const loadTranslations = async () => {
        const { t, resources } = await initTranslations(locale, namespaces);
        setTranslations({ t, resources });
      };
      loadTranslations();
    }, [locale]);
  
    const { t, resources } = translations;


  return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
    <div className="page bg-white pb-24 md:pb-0">
        <div className='flex flex-col justify-center items-center w-full relative'>
            <HeaderItem/>
            <div className='flex flex-col justify-center items-center pt-4 w-full'>
                <ExperienceInnerItem experienceId={experienceId} />
            </div>
        </div>
        <LanguageSwitcher />
        <FooterItem />
    </div>
    </TranslationsProvider>
  )
}