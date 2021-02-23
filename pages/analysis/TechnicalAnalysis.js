import React from "react";
import { AnalysisProvider } from "./AnalysisContext";
import AnalysisPage from "./analysis_sections/AnalysisPage";
const TechnicalAnalysis = () => {
  return (
    <AnalysisProvider>
      <AnalysisPage />
    </AnalysisProvider>
  );
};
export default TechnicalAnalysis;
