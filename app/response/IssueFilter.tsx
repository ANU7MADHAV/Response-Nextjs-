"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "Close", value: "CLOSE" },
  { label: "In progress", value: "IN_PROGRESS" },
];

const IssueFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams();

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || ""}
      onValueChange={(status) => {
        if (status) params.append("status", status);
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);
        const query = params.size ? "?" + params.toString() : "";
        router.push("/response/" + query);
      }}
    >
      <Select.Trigger placeholder="Filter by status.." />
      <Select.Content>
        <Select.Group>
          <Select.Label>
            {statuses.map((status) => (
              <Select.Item
                key={status.value}
                value={status.value === null ? "" : status.value!}
              >
                {status.label}
              </Select.Item>
            ))}
          </Select.Label>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueFilter;
