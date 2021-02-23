import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import { useRouter } from "next/router";
const defaultValue = {
  loading: false,
  name: "",
  intent: null,
  buyIntents: null,
};
const AnalysisContext = React.createContext(defaultValue);
export const AnalysisProvider = (props) => {
  const [data, setData] = useState(defaultValue);
  const { asPath } = useRouter();

  useEffect(() => {
    const action = asPath.split("/analysis/")[1];
    let url = "";
    let tech_id = "";
    if (action === "new") url = "/controller/config/technical-analysis/new";
    else {
      tech_id = parseInt(action.split("/")[1]);
      url = `/controller/config/technical-analysis/update/${tech_id}`;
    }
    axios.get(url).then((res) => {
      const data = res.data.technicaAnalysis;
      const newSelectedIndi = data.indicators.selected.map((item, index) => ({
        id: index + 1,
        value: item,
      }));
      setData({
        ...data,
        action: action === "new" ? "new" : "update",
        tech_id,
        name: { value: data.name, error: false },
        intent: data.intent,
        indicators: { ...data.indicators, selected: newSelectedIndi },
      });
    });
  }, []);
  const setName = (name) => {
    setData({ ...data, name: { ...data.name, value: name } });
  };
  const setErrorName = (status) => {
    setData({ ...data, name: { ...data.name, error: status } });
  };
  const setLoading = (status) => {
    setData({ ...data, loading: status });
  };
  const setIntent = (value) => {
    if (value === "buy") {
      setData({
        ...data,
        intent: { ...data.intent, selected: value },
        indicators: {
          ...data.indicators,
          selected: [{ id: 0, value: "agulhadahigh" }],
        },
      });
    } else
      setData({
        ...data,
        intent: { ...data.intent, selected: value },
        indicators: {
          ...data.indicators,
          selected: [{ id: 0, value: "agulhadalow" }],
        },
      });
  };
  const addIndicator = () => {
    const newIndi = {
      id: data.indicators.selected.length + 1,
      value: data.intent === "buy" ? "agulhadahigh" : "agulhadalow",
    };
    const newSelector = [...data.indicators.selected, newIndi];
    setData({
      ...data,
      indicators: { ...data.indicators, selected: newSelector },
    });
  };
  const removeIndicator = (id) => {
    const newIndicator = data.indicators.selected.filter(
      (item) => item.id !== id
    );
    setData({
      ...data,
      indicators: { ...data.indicators, selected: newIndicator },
    });
  };
  const ChangeIndicator = (id, value) => {
    const newSetected = data.indicators.selected.map((indi) => {
      if (indi.id === id) {
        return { id: indi.id, value };
      } else return indi;
    });
    setData({
      ...data,
      indicators: { ...data.indicators, selected: newSetected },
    });
  };
  return (
    <AnalysisContext.Provider
      value={{
        ...data,
        setName,
        setIntent,
        setLoading,
        addIndicator,
        removeIndicator,
        setErrorName,
        ChangeIndicator,
      }}
    >
      {props.children}
    </AnalysisContext.Provider>
  );
};
export default AnalysisContext;
