import dynamic from "next/dynamic";
import IssueSkeleton from "./loading";
import { Metadata } from "next";

const IssueForm = dynamic(
  () => import("@/app/response/_components/IssueForm"),
  {
    ssr: false,
    loading: () => <IssueSkeleton />,
  }
);

const IssueFormPage = () => {
  return <IssueForm />;
};

export const metadata: Metadata = {
  title: "New Response",
  description: "Add new response",
};

export default IssueFormPage;
