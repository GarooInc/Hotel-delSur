import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import ArrowBack from '@/components/ArrowBack/ArrowBack'
import FoodDrinksItem from '@/components/FoodDrinksItem/FoodDrinksItem'


const namespaces = ['food_drinks', 'header']

export default async function FoodDrinks({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-white">
            <ArrowBack absolute white={true} />
            <FoodDrinksItem />

        </div>
        <LanguageSwitcher />
    </TranslationsProvider>
  )
}