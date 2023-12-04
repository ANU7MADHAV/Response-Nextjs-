import { Metadata } from "next";
import LatestIssue from "./LatestIssue";

const HomePage = () => {
  return <LatestIssue />;
};
export const metadata: Metadata = {
  title: "Response (dashboard)",
  description: "Write your responses",
};

export default HomePage;
