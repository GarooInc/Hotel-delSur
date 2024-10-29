import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import Menu from '@/components/Menu/Menu'
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import FooterCart from '@/components/FooterCart/FooterCart'

const namespaces = ['room-service', 'header']

export default async function RoomService({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)



    return (
        <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <main className="page bg-white">
            <HeaderItem v2 />
            <Menu collection={"Room_Service"}/>
            <FooterCart />
        </main>
        <LanguageSwitcher />
        </TranslationsProvider>
    );
    }