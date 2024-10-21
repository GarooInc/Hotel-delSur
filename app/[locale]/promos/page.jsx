import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import TabCartItem from '@/components/TabCartItem/TabCartItem'
import FooterCart from '@/components/FooterCart/FooterCart'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import HeaderItem from '@/components/HeaderItem/HeaderItem'


const namespaces = ['promos', 'home', 'general']

export default async function Promos({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-white md:px-20 px-10 relative">
            <HeaderItem />
            <div className='flex flex-col justify-center items-center'>
                <h1 className="italictiempos_title">{t('promos:title')}</h1>
                <div className="description_page_general">
                    {t('promos:text1')}
                </div>
            </div>
            <LanguageSwitcher />
            <TabCartItem collection={"promos"} />
            <FooterCart />
        </div>
    </TranslationsProvider>
  )
}