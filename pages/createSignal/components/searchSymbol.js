import React, {useCallback, useState, useContext, useEffect} from 'react';
import {Autocomplete, Icon, TextField} from '@shopify/polaris';
import {SearchMinor} from '@shopify/polaris-icons';
import SignalContext from './signalContext';


const SearchSymbol = props =>  {
  
  const contextSymbol = useContext(SignalContext);
  const { symbolOptions, setSymbolOption } = contextSymbol;
  // console.log('symbolOptions searchsymbol',symbolOptions);
  const [selectedOptions, setSelectedOptions] = useState(symbolOptions.selected);
  const [inputValue, setInputValue] = useState(symbolOptions.selected);
  const [options, setOptions] = useState(symbolOptions.symbols);
  useEffect(() => {
    setOptions(symbolOptions.symbols);
    setSelectedOptions(symbolOptions.selected);
  })
  // console.log("symbolOptions options",options);

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === '') {
        setOptions(symbolOptions.symbols);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = symbolOptions.symbols.filter((option) =>
        option.label.match(filterRegex),
      );
      setOptions(resultOptions);
    }
  );

  const updateSelection = useCallback((selected) => {
    const selectedValue = selected.map((selectedItem) => {
      const matchedOption = options.find((option) => {
        return option.value.match(selectedItem);
      });
      return matchedOption && matchedOption.label;
    });
    setSelectedOptions(selected);
    
    setInputValue(selectedValue);
    setSymbolOption(selected);
  });

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Symbol"
      value={inputValue}
      prefix={<Icon source={SearchMinor} color="inkLighter" />}
      placeholder="Search"
    />
  );

  return (
    <div style={{height: '225px'}}>
      <Autocomplete
        options={options}
        selected={selectedOptions}
        onSelect={updateSelection}
        textField={textField}
        willLoadMoreResults = {true}
      />
    </div>
  );
}
export default SearchSymbol;