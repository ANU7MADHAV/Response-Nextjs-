import dynamic from "next/dynamic";
import IssueSkeleton from "./loading";

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

export default IssueFormPage;
