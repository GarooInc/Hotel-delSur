'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { IoLanguage } from "react-icons/io5";
import i18nConfig from '@/i18nConfig'

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = e => {
    const newLocale = e.target.value;

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };


    return (
        <div className='absolute top-4 right-0 p-4 dropdown z-0'>
          <div tabIndex={0} role="button" className="m-4 bg-transparent">
            <IoLanguage className="text-primary text-4xl" />
          </div>
          <select onChange={handleChange} value={currentLocale} tabIndex={0} className="dropdown-content card card-compact bg-primary text-white z-[1] w-20 p-2 shadow">
              <option value="en">EN</option>
              <option value="es">ES</option>
          </select>
        </div>
    )
}

export default LanguageSwitcher;
