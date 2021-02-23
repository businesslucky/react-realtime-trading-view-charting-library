import React, { useContext, useCallback } from "react";
import AnalysisContenxt from "../AnalysisContext";
import { DeleteMinor, CirclePlusMajorMonotone } from "@shopify/polaris-icons";
import i18n from "i18next";
import { Select, Icon } from "@shopify/polaris";
const Indicator = () => {
  const dataContext = useContext(AnalysisContenxt);
  const {
    indicators,
    intent,
    addIndicator,
    ChangeIndicator,
    removeIndicator,
  } = dataContext;
  const OptionsBuyIndicator =
    indicators &&
    indicators.buyIntents.map((item) => ({
      value: item,
      label: i18n.t(`technicalAnalysis:standardIndicators.${item}`),
    }));
  const OptionsSellIndicator =
    indicators &&
    indicators.sellIntents.map((item) => ({
      value: item,
      label: i18n.t(`technicalAnalysis:standardIndicators.${item}`),
    }));
  const renderSelector = useCallback(
    indicators &&
      indicators.selected.map((item, index) => {
        if (index === 0) {
          return (
            <div className="first-indi" key={item.id}>
              <Select
                label={i18n.t("technicalAnalysis:labelIndicator")}
                options={
                  intent && intent.selected === "buy"
                    ? OptionsBuyIndicator
                    : OptionsSellIndicator
                }
                onChange={(value) => handleChange(item.id, value)}
                value={item.value}
                id={`indicator${index}`}
              />
            </div>
          );
        } else
          return (
            <div className="select-indi-wrapper" key={item.id}>
              <Select
                label={i18n.t("technicalAnalysis:labelIndicator")}
                options={
                  intent && intent.selected === "buy"
                    ? OptionsBuyIndicator
                    : OptionsSellIndicator
                }
                onChange={(value) => handleChange(item.id, value)}
                value={item.value}
                id={`indicator${index}`}
              />
              <div
                className="trash-icon"
                onClick={() => deleteIndicator(item.id)}
              >
                <Icon source={DeleteMinor} />
              </div>
            </div>
          );
      }),
    [indicators, intent]
  );
  const handleChange = (id, value) => {
    ChangeIndicator(id, value);
  };
  const addNewIndicator = () => {
    addIndicator();
  };
  const deleteIndicator = (id) => {
    removeIndicator(id);
  };
  return (
    <div className="indi-wrapper">
      {renderSelector}
      <div className="add-icon" onClick={addNewIndicator}>
        <Icon source={CirclePlusMajorMonotone} />
        <span>{i18n.t("technicalAnalysis:helpTextAddIndi")}</span>
      </div>
    </div>
  );
};
export default Indicator;
