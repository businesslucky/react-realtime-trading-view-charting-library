import React, {useCallback, useState} from 'react';
import {Select} from '@shopify/polaris';

const SelectInvest = props => {
  const [selected, setSelected] = useState('today');

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const options = [
    {label: '10%', value: '10'},
    {label: '20%', value: '20'},
    {label: '30%', value: '30'},
    {label: '40%', value: '40'},
    {label: '50%', value: '50'},
    {label: '60%', value: '60'},
    {label: '70%', value: '70'},
    {label: '80%', value: '80'},
    {label: '90%', value: '90'},
    {label: '100%', value: '100'},
  ];

  return (
    <Select
      label="Invest"
      options={options}
      onChange={handleSelectChange}
      value={selected}
    />
  );
}
export default SelectInvest;