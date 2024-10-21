import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import ButtonNav from '@/components/ButtonNav/ButtonNav'
import ChatBubble from '@/components/ChatBubble/ChatBubble'
import { HiInformationCircle } from "react-icons/hi2"

const namespaces = ['menu', 'header']

export default async function Home({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)
    const nav = [
        {
            title: t('menu:nav1'),
            link: '/welcome'
        },
        {
            title: t('menu:nav2'),
            link: '/experiences'
        },
        {
            title: t('menu:nav9'),
            link: '/spa'
        },
        {
            title: t('menu:nav10'),
            link: '/promos'
        },
        {
            title: t('menu:nav11'),
            link: '/emergency'
        },
        {
            title: t('menu:nav12'),
            link: '/laundry'
        },
        {
            title: t('menu:nav3'),
            link: '/food_drinks'
        },
        {
            title: t('menu:nav4'),
            link: '/activities'
        },
        {
            title: t('menu:nav8'),
            link: '/faqs'
        }
    ]

    return (
        <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <main className="page bg-white pt-10 pb-20 md:py-10">
            <div className='flex flex-col justify-center items-center'>
                <img src="/assets/images/logo.png" alt="logo" className="w-[150px]" />
                <div className="flex flex-col justify-center items-center gap-4 pt-10">
                    {
                        nav.map((item, index) => (
                            <ButtonNav key={index} title={item.title} link={item.link} />
                        ))
                    }
                </div>
            </div>
            <ChatBubble />
        </main>
        <LanguageSwitcher />
        <a href='https://garooinc.com/' className="fixed top-10 left-10">
            <HiInformationCircle className="info-icon text-4xl text-primary" />
        </a>
        </TranslationsProvider>
    );
}