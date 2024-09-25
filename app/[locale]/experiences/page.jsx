import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import ExperiencesItem from '@/components/ExperiencesItem/ExperiencesItem'
import ArrowBack from '@/components/ArrowBack/ArrowBack'
import HeaderItem from '@/components/HeaderItem/HeaderItem'


const namespaces = ['experiences', 'header']

export default async function Experiences({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <HeaderItem v={"v5"}/>
        <div className="page bg-white py-10 md:px-20 px-10">
            <h1 className="principal_title">Amenities</h1>
            <ExperiencesItem />
        </div>
        <LanguageSwitcher />
    </TranslationsProvider>
  )
}