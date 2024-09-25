import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import HeaderItem from '@/components/HeaderItem/HeaderItem'

const namespaces = ['faqs', 'header']

const faqs = [
    {
        question: "What is the check-in time?",
        answer: "Check-in time is 3:00 PM."
    },
    {
        question: "What is the check-out time?",
        answer: "Check-out time is 11:00 AM."
    },
    {
        question: "Do you allow pets?",
        answer: "We do not allow pets."
    },
    {
        question: "Do you have a gym?",
        answer: "Yes, we have a gym."
    },
    {
        question: "Do you have a pool?",
        answer: "Yes, we have a pool."
    },
    {
        question: "Do you have a restaurant?",
        answer: "Yes, we have a restaurant."
    },
    {
        question: "Do you have a bar?",
        answer: "Yes, we have a bar."
    },
    {
        question: "Do you have a spa?",
        answer: "Yes, we have a spa."
    },
]

export default async function Faqs({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-white">
            <div className="flex flex-col w-full items-center">
                <HeaderItem namePage="FAQs" />
                <div className='flex flex-col justify-center items-center gap-4 py-10 md:w-3/4'>
                {
                    faqs.map((item, index) => (
                        <div className="collapse collapse-arrow bg-light-brown" key={index}>
                        <input type="radio" name="my-accordion-2" defaultChecked />
                        <div className="collapse-title text-xl font-medium text-white font-futura">{item.question}</div>
                        <div className="collapse-content">
                            <p className='text-white font-futura-light'>{item.answer}</p>
                        </div>
                        </div>
                    ))
                }
            </div>
            </div>
        </div>
        <LanguageSwitcher />
    </TranslationsProvider>
  )
}