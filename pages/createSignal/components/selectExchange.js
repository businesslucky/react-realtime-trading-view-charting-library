import React, {useCallback, useState, useContext, useEffect} from 'react';
import {AppProvider, Select} from '@shopify/polaris';
import SignalContext from './signalContext';

const SelectExchange = props => {
  const contextExchange = useContext(SignalContext);
  const { setSelectedExchange } = contextExchange;
  const data = contextExchange.exchangeOptions;
  const [selected, setSelected] = useState();

  // Load select optiopns
  let options = []
  for ( const value of data.values ) {
    options.push({ label: value, value: value })
  }

  // Changes the value of the select + context
  const handleSelectChange = (value, id) => {
    setSelectedExchange(value)
    setSelected({
      ...selected,
      [id]: value
    });
  };

  return (
    <AppProvider>
      <Select
        label="Exchange"
        options={options}
        onChange={handleSelectChange}
        value={contextExchange.exchangeOptions.selected}
      />
    </AppProvider>

  );

}
export default SelectExchange;
