import React, {useCallback, useState, useContext, useEffect} from 'react';
import {Select} from '@shopify/polaris';
import SignalContext from './signalContext';
const SelectTarget = props => {
  
  const contextSymbol = useContext(SignalContext);
  const [selected, setSelected] = useState(SignalContext.numTarget);

  const handleSelectChange = useCallback((value) => {
    contextSymbol.setNumTarget(value);
    setSelected(value);
  });

  const options = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
  ];

  return (
    <div className = "mt-18">
      <Select
        label="Number of targets"
        options={options}
        onChange={handleSelectChange}
        value={contextSymbol.numTarget}
      />
    </div>
    
  );
}
export default SelectTarget;