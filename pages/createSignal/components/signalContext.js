import React, { useState, useContext, useEffect, useCallback } from "react";
import axios from "axios";
import { checkValuePercent, getNumberOfStringTarget } from "../../../util/String";
const defaultValue = {
  symbolOptions: {
    symbols:[
      {value: 'BTCUSDT', label: 'BTCUSDT',symbol: 'BTC/USDT'},
      // {value: 'ADABTC', label: 'ADABTC',symbol: 'ADA/BTC'},
      // {value: 'FETBTC', label: 'FETBTC',symbol: 'FET/BTC'},
      // {value: 'XRPBTC', label: 'XRPBTC',symbol: 'XRP/BTC'},
      // {value: 'THETABTC', label: 'THETABTC',symbol: 'THETA/BTC'}
    ],
    selected: 'BTCUSDT'
  },
  exchangeOptions : {
    values: ["BINANCE"],
    selected: 'BINANCE'
  },
  loading: false,
  chartState : {},
  chartStates: {},
  signalType: 'long',
  numTarget: '1'
};
const SignalContext = React.createContext(defaultValue);
export const SignalProvider = props => {
  const [data, setData] = useState(defaultValue);
  useEffect(() => {
    axios
      .all([
        axios.get("/signal/new/get-symbols"),
        axios.get("/signal/new/get-templates"),
        axios.get("/signal/new/get-exchanges")
      ])
      .then(
        axios.spread((...responses) => {

          const symbolOptions = responses[0].data;
          const templateOptions = responses[1].data;
          const exchangeOptions = responses[2].data;
    
          const symbolOptionFormat = symbolOptions.symbols.map((symbol,index) => {
            return {value: symbol, label: symbol,symbol: symbolOptions.chartSymbols[index]}
          })
          const symbolResults = {
            symbols:symbolOptionFormat,
            selected:symbolOptions.selected
          }
          setData({
            ...data,
            loading:false,
            symbolOptions: symbolResults,
            exchangeOptions: exchangeOptions.exchanges,
            chartStates: templateOptions,
            chartState: templateOptions[symbolOptions.selected]
          });
        })
      )
      .catch(errors => {
        console.log(errors);
      });
  }, []);
  
  const setSymbolOption = status => {
    const changeDataSymbol = { ...data.symbolOptions, selected:status[0] };
    const chartState = data.chartStates[status];
    setData({ ...data, symbolOption: changeDataSymbol,chartState:chartState });
  };
  const setSelectedExchange = value => {
    const changeDataExchange = { ...data.exchangeOptions, selected: value};
    setData({ ...data, exchangeOptions: changeDataExchange});
  };
  const setLoading = status => {
    setData({ ...data, loading: status });
  };
  const setNumTarget = value => {
    setData({ ...data, numTarget: value });
  };
  const setSignalType = value =>{
    axios
      .get("/signal/new/get-template/"+value)
      .then(response => {        
        const templateOptions = response.data;
        setData({...data,
           signalType: value,
           chartStates: templateOptions,
           chartState: templateOptions[data.chartState.symbol]
        });
      })
  }
  const setChartState = (key,value) => {
    
    var changedChartState = data.chartState;
    changedChartState[key].price = value;
    setData({...data,chartState:changedChartState});
  
  }
  return (
    <SignalContext.Provider
      value={{ ...data, setSymbolOption, setSelectedExchange, setLoading, setSignalType, setNumTarget, setChartState }}
    >
      {props.children}
    </SignalContext.Provider>
  );
};
export default SignalContext;