"use client";

const RadioButton = ({ value, onChange, star, checked }) => {
  return (
    <div className={`${star ? 'flex px-2' : 'flex flex-col w-full py-2'}`}>
      <div className='flex flex-row w-full justify-start items-center gap-4'>
        <label className={`${star? "hidden" : "font-futura text-sm text-black font-light"}`}>{value}</label>
        {!star && (
          <input
            type="radio"
            className={`radio checked:bg-secondary checked:border-secondary border-2 border-secondary/60`}
            name="reason"
            id={value}
            value={value}
            onChange={onChange}
          />
        )}
        {star && (
          <input
            type="radio"
            name="rating"
            className={`mask mask-star-2  hover:bg-primary ${checked ? 'bg-primary' : 'bg-primary/60'}`}
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
};

export default RadioButton;