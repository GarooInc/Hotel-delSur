import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import TabCartItem from '@/components/TabCartItem/TabCartItem'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import FooterItem from '@/components/FooterItem/FooterItem'
import Menu from '@/components/Menu/Menu'


const namespaces = ['laundry', 'home', 'general']

export default async function Laundry({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-white md:px-20 px-10 relative">
            <HeaderItem />
            <div className='flex flex-col justify-center items-center'>
                <h1 className="italictiempos_title">{t('laundry:title')}</h1>
                <div className="description_page_general">
                    {t('laundry:text1')}
                </div>
            </div>
            <LanguageSwitcher />
            <TabCartItem collection={"laundry"} />
            <FooterItem />
        </div>
    </TranslationsProvider>
  )
}