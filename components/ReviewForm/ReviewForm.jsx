"use client";
import React, { useState } from 'react';
import RadioButton from '../RadioButton/RadioButton';
import useRadioGroup from '../../hooks/useRadioGroup';
import { useTranslation } from 'react-i18next';

const ReviewForm = () => {
  const [selectedReason, handleRadioChange] = useRadioGroup('');
  const [selectedRelax, handleRadioChangeSecond] = useRadioGroup('');
  const [rating, setRating] = useState(0);

  const { t } = useTranslation();

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value));
  };
    

  return (
    <form className="flex flex-col w-full h-full pb-10">
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
          placeholder={t('review:specify')}
          className="textarea textarea-bordered textarea-md w-full bg-white"
        ></textarea>
        <label className='review_label'>{t('review:question5')}</label>
        <textarea
          placeholder={t('review:specify')}
          className="textarea textarea-bordered textarea-md w-full  bg-white"
        ></textarea>
      </div>
    </form>
  );
};

export default ReviewForm;