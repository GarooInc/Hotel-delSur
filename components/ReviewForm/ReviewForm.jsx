"use client";
import React, { useState } from 'react';
import RadioButton from '../RadioButton/RadioButton';
import useRadioGroup from '../../hooks/useRadioGroup';
import { useTranslation } from 'react-i18next';
import { useRouter } from "next/navigation"

const ReviewForm = () => {
  const [selectedReason, handleRadioChange] = useRadioGroup('');
  const [selectedRelax, handleRadioChangeSecond] = useRadioGroup('');
  const [rating, setRating] = useState(0);
  const [improvement, setImprovement] = useState('');
  const [comments, setComments] = useState('');
  const [message, setMessage] = useState([]);

  const router = useRouter();

  const { t } = useTranslation();

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value));
  };

  const handleImprovementChange = (e) => {
    setImprovement(e.target.value);
  }

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      reason1: selectedReason,
      reason2: selectedRelax,
      rating,
      improvement,
      comments,
    };


    try {
      const response = await fetch('https://hotel-del-sur-zapier-api.koyeb.app/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage(
            {
              message: t('review:success'),
              type: 'success'
            }
        )

        setTimeout(() => {
          router.push('/');
        }
        ,4000);
      } else {
        setMessage(
            {
              message: t('review:error'),
              type: 'error'
            }
        )
      }
    } catch (error) {
      alert('Error submitting review');
      setMessage(
          {
            message: t('review:error'),
            type: 'error'
          }
      )
    }
  };

    

  return (
    <form className="flex flex-col w-full h-full pb-10 relative">
      <div className="flex flex-col w-full">
        <label className='review_label'>{t('review:question1')}</label>
        <div className="flex flex-col w-full">
          <RadioButton value={t('review:answer1_1')} name="reason1" onChange={handleRadioChange} />
          <RadioButton value={t('review:answer1_2')} name="reason1" onChange={handleRadioChange} />
          <RadioButton value={t('review:answer1_3')} name="reason1" onChange={handleRadioChange} />
          <RadioButton value={t('review:answer1_4')} name="reason1" onChange={handleRadioChange} />
          <RadioButton value={t('review:another')} name="reason1" onChange={handleRadioChange} />
        </div>
        {selectedReason === 'Otro' && (
          <div className="flex flex-col w-full mt-4">
            <label>{t('review:specify')}</label>
            <input
              type="text"
              id="otherReason"
              name="otherReason"
              className="input"
            />
          </div>
        )}

        <label className='review_label'>{t('review:question2')}</label>
        <div className="flex flex-col w-full">
          <RadioButton value={t('review:answer2_1')} name="reason2" onChange={handleRadioChangeSecond} />
          <RadioButton value={t('review:answer2_2')} name="reason2" onChange={handleRadioChangeSecond} />
          <RadioButton value={t('review:answer2_3')} name="reason2" onChange={handleRadioChangeSecond} />
          <RadioButton value={t('review:answer2_4')} name="reason2" onChange={handleRadioChangeSecond} />
          <RadioButton value={t('review:another')} name="reason2" onChange={handleRadioChangeSecond} />
        </div>
        {selectedRelax === 'Otro' && (
          <div className="flex flex-col w-full mt-4">
            <label htmlFor="otherRelax">{t('review:specify')}</label>
            <input
              type="text"
              id="otherRelax"
              name="otherRelax"
              className="input"
            />
          </div>
        )}
        <label className='review_label'>{t('review:question3')}</label>
        <div className="rating py-2">
          {[1, 2, 3, 4, 5].map((starValue) => (
            <RadioButton
              key={starValue}
              star
              value={starValue}
              name="rating"
              checked={rating >= starValue}
              onChange={handleRatingChange}
            />
          ))}
        </div>
        <label className='review_label'>{t('review:question4')}</label>
        <textarea
          onChange={handleImprovementChange}
          placeholder={t('review:specify')}
          className="textarea textarea-bordered textarea-md w-full bg-white"
        ></textarea>
        <label className='review_label'>{t('review:question5')}</label>
        <textarea
          onChange={handleCommentsChange}
          placeholder={t('review:specify')}
          className="textarea textarea-bordered textarea-md w-full  bg-white"
        ></textarea>
      </div>
      
      {
        !message.message &&( <button onClick={handleSubmit}
      className="btn bg-primary text-white w-full mt-4 border-none hover:bg-primary hover:transform hover:scale-105 transition duration-300">
        {t('review:send')}
      </button>)
      }
      {
        message.message && (
          <div className={`w-full ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'} shadow-md p-2 text-white mt-4  flex justify-center items-center animate-fade-in`}>
            <p>{message.message}</p>
          </div>
        )
      }
      
    </form>
  );
};

export default ReviewForm;