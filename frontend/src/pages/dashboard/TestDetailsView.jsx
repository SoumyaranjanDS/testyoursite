import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import TestDetails from "../../components/dashboard/TestDetails";

const TestDetailsView = () => {
  const { testId } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard/history");
  };

  const handleRerun = (testData) => {
    navigate("/dashboard/load-generator", { state: { testData } });
  };

  return <TestDetails testId={testId} onBack={handleBack} onRerun={handleRerun} />;
};

export default TestDetailsView;
