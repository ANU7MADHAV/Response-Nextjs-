import { Table } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import IssueAction from "./IssueAction";

const TableLoading = () => {
  const issues = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div>
      <IssueAction />
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </Table.Row>

          <Table.Row>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </Table.Row>

          <Table.Row>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default TableLoading;
