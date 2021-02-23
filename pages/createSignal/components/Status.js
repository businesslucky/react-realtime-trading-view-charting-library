//import React, { useState, useEffect } from "react";
import React, { useContext, useCallback } from "react";
import { AppProvider, Icon, Spinner } from "@shopify/polaris";
import "./Status.scss";
import i18n from "i18next";
import {
  CircleDisabledMajorTwotone,
  CircleTickMajorTwotone,
  CircleAlertMajorFilled
} from "@shopify/polaris-icons";
import SignalContext from "./signalContext";

const Status = props => {
  const contextData = useContext(SignalContext);
  const { loading } = contextData;
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, []);

  const LoadError = () => (
    <>
      <div className="icon-error-wrapper">
        <Icon source={CircleDisabledMajorTwotone} backdrop={true} color="red" />
      </div>
      <p className="mt-5 mb-5 text-load-error">
        {/* {i18n.t("trailing:textLoadingError")} */}
        LoadingError
      </p>
      <div className="pt-5">
        <a
          href="https://t.me/AnnyDeCrypto_bot"
          className="mt-5"
          target="_blank"
        >
          {/* {i18n.t("trailing:textRemoteTele")} */}
          RemoteTele
        </a>
      </div>
    </>
  );
  const LoadSuccess = () => (
    <>
      <div className="icon-success-wrapper">
        <Icon source={CircleTickMajorTwotone} color="green" backdrop={true} />
      </div>
      <p className="mt-5 mb-5 text-load-success">
        {/* {i18n.t("trailing:textLoadingSuccess")} */}
        LoadingSuccess
      </p>
      <div className="pt-5">
        <a
          href="https://t.me/AnnyDeCrypto_bot"
          className="mt-5"
          target="_blank"
        >
          {/* {i18n.t("trailing:textRemoteTele")} */}
          RemoteTele
        </a>
      </div>
    </>
  );
  const LoadLoading = () => (
    <>
      <Spinner
        accessibilityLabel="Spinner example"
        size="large"
        color="inkLightest"
      />
      <p className="mt-5 mb-5 text-load-loading">
        {/* {i18n.t("trailing:textLoading")} */}
        Please hold we are creating your signal
      </p>
    </>
  );
  const LoadWarning = () => (
    <>
      <Icon source={CircleAlertMajorFilled} backdrop={true} />
      <p className="mt-5 mb-5 text-load-warning">
        {/* {i18n.t("trailing:textLoadingWarning")} */}
        LoadWarning
      </p>
      <div className="pt-5">
        <a
          href="https://t.me/AnnyDeCrypto_bot"
          className="mt-5"
          target="_blank"
        >
           {/* {i18n.t("trailing:textRemoteTele")} */}
           RemoteTele
        </a>
      </div>
    </>
  );
  const renderLoading = useCallback(
    status => {
      switch (status) {
        case "success":
          return <LoadSuccess />;
        case "error":
          return <LoadError />;
        case "loading":
          return <LoadLoading />;
        case "warning":
          return <LoadWarning />;
        // case "invisible":
        //   handleLoadingStatus(false);
        //   return null;
        default:
          return <LoadLoading />;
      }
    },
    [loading]
  );
  return (
  <AppProvider>
    <div className="container bg-white status text-center">
      <div>{renderLoading(loading)}</div>
    </div>
  </AppProvider>
  );
};
export default Status;
