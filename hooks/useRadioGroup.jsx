import { useState } from 'react';

const useRadioGroup = (initialValue = '') => {
  const [selectedValue, setSelectedValue] = useState(initialValue);

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  return [selectedValue, handleChange];
};

export default useRadioGroup;