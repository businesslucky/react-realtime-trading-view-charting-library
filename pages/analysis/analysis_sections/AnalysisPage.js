import React, { useContext, useState } from "react";
import AnalysisContext from "../AnalysisContext";
import i18n from "i18next";
import { SettingsMinor } from "@shopify/polaris-icons";
import "@shopify/polaris/styles.css";
import "../analysis.scss";
import querystring from "querystring";
import {
  AppProvider,
  Card,
  ContextualSaveBar,
  Frame,
  Layout,
  Tabs,
  Loading,
  Page,
  Icon,
  ButtonGroup,
  Button,
  Heading,
  Form,
} from "@shopify/polaris";
import ResponseFullScreen from "../../common/ResponseFullScreen";
import AnalysisForm from "./AnalysisForm";
import axios from "axios";
const AnalysisPage = () => {
  const analysisContext = useContext(AnalysisContext);
  const {
    setErrorName,
    name,
    indicators,
    setLoading,
    action,
    tech_id,
  } = analysisContext;
  const [loadingStatus, setLoadingStatus] = useState(false);
  const handleCancle = () => {
    setLoading("warning");
    setLoadingStatus(true);
  };
  const handleSaveData = () => {
    const myRe = /[!@#$%^&*(),.?";:{}|<>]/g;
    let checkRegex = myRe.exec(name.value);
    // Success Name
    if (checkRegex === null && name.value !== "") {
      if (name.error === true) setErrorName(false);
      const listIndicator = indicators.selected.map((indi) => indi.value);
      let dataPost = {};
      let urlPost = "/controller/config/technical-analysis/new-or-update";
      if (action === "new") {
        dataPost = {
          action: "create",
          description: " Test analysis",
          name: name.value,
          indicator_keys: listIndicator,
        };
      } else {
        dataPost = {
          action: "update",
          tech_id,
          description: "Test analysis updated",
          name: name.value,
          indicator_keys: listIndicator,
        };
      }
      setLoadingStatus(true);
      setLoading("loading");
      axios
        .post(urlPost, (querystring.stringify = dataPost))
        .then(() => {
          setLoading("success");
        })
        .catch(() => setLoading("error"));
    } else {
      setErrorName(true);
    }
  };
  return (
    <AppProvider
      i18n={{
        Polaris: {
          ContextualSaveBar: {
            save: i18n.t("trailing:buttonSave"),
            discard: i18n.t("trailing:buttonCancel"),
          },
        },
      }}
    >
      <Frame>
        {loadingStatus ? (
          <ResponseFullScreen
            textSuccess={i18n.t("technicalAnalysis:textLoadingSuccess")}
            textError={i18n.t("technicalAnalysis:textLoadingError")}
            textWarning={i18n.t("technicalAnalysis:textLoadingWarning")}
            context={AnalysisContext}
          />
        ) : (
          <Form>
            <div className="container p-0">
              <Card sectioned>
                <div className="row mr-1 justify-content-between analysis">
                  <div className="d-flex ml-4 align-items-center">
                    <Icon source={SettingsMinor} />
                    <Heading element="h4" className="ml-4">
                      {action && action === "new"
                        ? i18n.t("technicalAnalysis:headNew")
                        : i18n.t("technicalAnalysis:headUpdate")}
                    </Heading>
                  </div>
                  <ButtonGroup>
                    <Button
                      disabled={analysisContext.intent ? false : true}
                      onClick={handleCancle}
                    >
                      {i18n.t("trailing:buttonCancel")}
                    </Button>
                    <Button
                      disabled={analysisContext.intent ? false : true}
                      onClick={handleSaveData}
                      primary
                    >
                      {i18n.t("trailing:buttonSave")}
                    </Button>
                  </ButtonGroup>
                </div>
              </Card>
              <AnalysisForm />
            </div>
          </Form>
        )}
      </Frame>
    </AppProvider>
  );
};

export default AnalysisPage;
