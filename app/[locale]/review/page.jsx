import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import FooterItem from '@/components/FooterItem/FooterItem'
import ReviewForm from '@/components/ReviewForm/ReviewForm'


const namespaces = ['review', 'home']

export default async function Reviews({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-white relative">
            <HeaderItem />
            <div className='flex flex-col justify-center items-center md:px-20 px-10'>
                <h1 className="italictiempos_title">{t('review:title')}</h1>
                <div className="description_page_general">
                    {t('review:desc')}
                </div>
                <ReviewForm />

            </div>
            <LanguageSwitcher />
        </div>
    </TranslationsProvider>
  )
}