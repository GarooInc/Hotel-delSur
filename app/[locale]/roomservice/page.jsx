import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import { FaShoppingCart } from "react-icons/fa"
import Menu from '@/components/Menu/Menu'
import { TbHome } from "react-icons/tb"
import HeaderItem from '@/components/HeaderItem/HeaderItem'


const namespaces = ['room-service', 'header']

export default async function RoomService({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)



    return (
        <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <main className="page bg-white">
            <HeaderItem v2 />
            <Menu />
            <div className="md:w-[40%] w-[90%] h-20 bg-white rounded-tl-2xl rounded-tr-2xl shadow-2xl border-black fixed bottom-0 flex justify-evenly" >
                <div className="flex justify-center items-center gap-4 flex-col">
                    <a href="/" className="flex justify-center items-center gap-4">
                        <TbHome className="text-3xl text-black" />
                    </a>
                    <p className="text-xs text-black font-futura">Home</p>
                </div>
                <div className="flex justify-center items-center gap-4 flex-col">
                    <a href="/cart" className="flex justify-center items-center gap-4">
                        <FaShoppingCart className="text-3xl text-black" />
                    </a>
                    <p className="text-xs text-black font-futura">Cart</p>
                </div>
            </div>
        </main>
        <LanguageSwitcher />
        </TranslationsProvider>
    );
    }