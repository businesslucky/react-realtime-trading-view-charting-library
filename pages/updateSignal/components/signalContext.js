import React, { useState, useContext, useEffect, useCallback } from "react";
import axios from "axios";
import { checkValuePercent, getNumberOfStringTarget } from "../../../util/String";
const defaultValue = {
  loading: false,
  chartState : {
    symbol:'BTC/USDT',
    exchange:'BINANCE',
    strategy:'SHORT',
    submissionDate:'March, 14th',
    chartData:{
      stopLoss: {time: "", price: 0, profit: 0, color: "red"},
      entryMin: {time: "", price: 0, profit: 0, color: "green"},
      entryMax: {time: "", price: 0, profit: 0, color: "green"},
      target1:  {time: "", price: 0, profit: 0, color: "#4985e7"},
      target2:  {time: "", price: 0, profit: 0, color: "#4985e7"},
      target3:  {time: "", price: 0, profit: 0, color: "#4985e7"},
      target4:  {time: "", price: 0, profit: 0, color: "#4985e7"},
      target5:  {time: "", price: 0, profit: 0, color: "#4985e7"},
      target6:  {time: "", price: 0, profit: 0, color: "#4985e7"} 
    }
  },
  firstChartState:{
      stopLoss: {time: "", price: 0, profit: 0, color: "red"},
      entryMin: {time: "", price: 0, profit: 0, color: "green"},
      entryMax: {time: "", price: 0, profit: 0, color: "green"},
      target1:  {time: "", price: 0, profit: 0, color: "#4985e7"},
      target2:  {time: "", price: 0, profit: 0, color: "#4985e7"},
      target3:  {time: "", price: 0, profit: 0, color: "#4985e7"},
      target4:  {time: "", price: 0, profit: 0, color: "#4985e7"},
      target5:  {time: "", price: 0, profit: 0, color: "#4985e7"},
      target6:  {time: "", price: 0, profit: 0, color: "#4985e7"} 
  }
};
const SignalContext = React.createContext(defaultValue);
export const SignalProvider = props => {
  const [data, setData] = useState(defaultValue);
  useEffect(() => {
    axios
      .all([
        axios.get("/signal/view/1")
      ])
      .then(
        axios.spread((...responses) => {
          var chartData = responses[0].data;
          var tempData = {}
			    for (let [key, value] of Object.entries(chartData.chartData)) {
            tempData[key]  = value.price;
          }
          console.log("tempData",tempData);
          setData({
            ...data,
            loading:false,
            chartState: chartData,
            firstChartState: tempData
          });
        })
      )
      .catch(errors => {
        console.log(errors);
      });
  }, []);
  
  const setLoading = status => {
    setData({ ...data, loading: status });
  };  
  const setChartState = (key,value) => {
    var changedChartState = data.chartState;
    changedChartState.chartData[key].price = value;
    setData({...data,chartState:changedChartState});
  }
  return (
    <SignalContext.Provider
      value={{ ...data, setLoading, setChartState}}>
      {props.children}
    </SignalContext.Provider>
  );
};
export default SignalContext;