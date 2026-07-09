"use client"

import { useEffect, useState } from 'react'
import PocketBase from 'pocketbase'

const popupFields = ['popup_img', 'popup_image', 'carousel_img']

const PopupImage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  const popupRecordId = process.env.NEXT_PUBLIC_POPUP_WELCOME_RECORD_ID

  useEffect(() => {
    const loadImage = async () => {
      if (!backendUrl) return

      try {
        const pb = new PocketBase(backendUrl)
        pb.autoCancellation(false)

        let record = null

        if (popupRecordId) {
          record = await pb.collection('welcome').getOne(popupRecordId)
        } else {
          const filter = popupFields.map((field) => `${field} != ""`).join(' || ')
          const records = await pb.collection('welcome').getFullList({ filter })
          record = records?.[0]
        }

        if (!record) return

        const imageField = popupFields.find((field) => Boolean(record[field]))
        if (!imageField) return

        const url = `${backendUrl}/api/files/${record.collectionId}/${record.id}/${record[imageField]}?token=`
        setImageUrl(url)
        setIsOpen(true)
      } catch (error) {
        console.error('Error loading popup image:', error)
      }
    }

    loadImage()
  }, [backendUrl, popupRecordId])

  if (!imageUrl || !isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="relative max-w-[90vw] max-h-[90vh] rounded-2xl bg-white p-3 shadow-2xl">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-2 top-2 z-10 rounded-full bg-black/70 px-3 py-1 text-sm text-white"
          aria-label="Cerrar popup"
        >
          ×
        </button>
        <img
          src={imageUrl}
          alt="Promoción"
          className="max-h-[80vh] max-w-[90vw] rounded-xl object-contain"
        />
      </div>
    </div>
  )
}

export default PopupImage
