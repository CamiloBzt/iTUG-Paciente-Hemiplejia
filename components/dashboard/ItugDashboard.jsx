"use client";

import Masthead from './Masthead';
import CohortStrip from './CohortStrip';
import Headline from './Headline';
import Asymmetry from './Asymmetry';
import ZProfile from './ZProfile';
import FeatureSpace from './FeatureSpace';
import Findings from './Findings';

export default function ItugDashboard() {
  return (
    <div className="itug-root">
      <Masthead />
      <CohortStrip />
      <Headline />
      <ZProfile />
      <Asymmetry />
      <FeatureSpace />
      <Findings />
    </div>
  );
}
