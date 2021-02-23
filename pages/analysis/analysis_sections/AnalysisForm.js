import React, { useContext } from "react";
import AnalysisContext from "../AnalysisContext";
import i18n from "i18next";
import {
  AppProvider,
  Card,
  FormLayout,
  RadioButton,
  Stack,
  Heading,
  TextField,
  Banner,
} from "@shopify/polaris";
import Indicator from "./Indicator";
const AnalysisForm = () => {
  const formContext = useContext(AnalysisContext);
  const { intent, setIntent, name, setName, action } = formContext;
  const handleChange = (id, value) => {
    setIntent(value);
  };
  const handleChangeNameAna = (value) => {
    setName(value);
  };

  return (
    <AppProvider>
      <div className="container p-0 analysis-form">
        <Card sectioned>
          <div className="row mr-1 justify-content-between">
            <div className="d-flex ml-4 align-items-center">
              <FormLayout>
                {name.error && (
                  <Banner onDismiss={() => {}} status="critical">
                    <p>{i18n.t("technicalAnalysis:bannerErorrName")}</p>
                  </Banner>
                )}
                {action && action === "update" && (
                  <h1 className="name-analysis">{name.value}</h1>
                )}
                <div className="intent-form">
                  <Heading element="h3">
                    {i18n.t("technicalAnalysis:radioIntentHead")}
                  </Heading>
                  <div className="intent-radio">
                    <RadioButton
                      label={i18n.t("technicalAnalysis:radioIntent1")}
                      checked={
                        intent && intent.selected === "buy" ? true : false
                      }
                      id="buy"
                      name="buy"
                      onChange={handleChange}
                    />
                    <RadioButton
                      label={i18n.t("technicalAnalysis:radioIntent2")}
                      id="sell"
                      name="sell"
                      checked={
                        intent && intent.selected === "sell" ? true : false
                      }
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <Heading element="h3">
                  {i18n.t("technicalAnalysis:indicatorHead")}
                </Heading>
                <Indicator />
                {action && action === "new" && (
                  <FormLayout.Group vertical={true}>
                    <div className="form-name">
                      <Stack vertical={true}>
                        <Heading element="h3">
                          {i18n.t("technicalAnalysis:nameHead")}
                        </Heading>
                        <TextField
                          name="nameAnalysis"
                          placeholder={i18n.t(
                            "technicalAnalysis:namePlaceholder"
                          )}
                          type="text"
                          value={name.value}
                          onChange={handleChangeNameAna}
                          error={
                            name.error &&
                            i18n.t("technicalAnalysis:textErrorName")
                          }
                        />
                      </Stack>
                    </div>
                  </FormLayout.Group>
                )}
              </FormLayout>
            </div>
          </div>
        </Card>
      </div>
    </AppProvider>
  );
};

export default AnalysisForm;
