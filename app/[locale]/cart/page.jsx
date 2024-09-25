import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import ArrowBack from '@/components/ArrowBack/ArrowBack'
import CartItem from '@/components/CartItem/CartItem'


const namespaces = ['cart', 'header']

export default async function Cart({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-white py-20 md:px-20 px-10 relative">
            <ArrowBack absolute nav="/roomservice" />
            <CartItem />
        </div>
        <LanguageSwitcher />
    </TranslationsProvider>
  )
}