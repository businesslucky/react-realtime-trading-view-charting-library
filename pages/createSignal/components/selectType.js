import React, {useCallback, useState, useContext, useEffect} from 'react';
import {
	Stack,
    RadioButton,
	FormLayout
} from '@shopify/polaris';

import SignalContext from './signalContext';


const SelectType = props => {

  const contextSymbol = useContext(SignalContext);
	const [signalType, setSignalType] = useState(contextSymbol.signalType);
	const handleChange = useCallback(
	  (_checked, newValue) => {
      contextSymbol.setSignalType(newValue);
      setSignalType(newValue)
    }
	);

  return (
    <FormLayout.Group>
        <Stack>
            <RadioButton
                label="Long"
                name="signalType"
                id="long"
                checked={signalType === 'long'}
                onChange={handleChange}
            />
            <RadioButton
                label="Short"
                name="signalType"
                id="short"
                checked={signalType === 'short'}
                onChange={handleChange}
            />
        </Stack>
    </FormLayout.Group>
  );
}
export default SelectType;