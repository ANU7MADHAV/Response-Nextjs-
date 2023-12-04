"use client";
import { Response, User } from "@prisma/client";
import { Select, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Audio } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";

const AssigneItems = ({ response }: { response: Response }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading) {
    return <Audio height="30" width="30" color="gray" ariaLabel="loading" />;
  }

  if (error) return null;

  const assignItems = (userId: string) => {
    axios
      .patch("/api/response/" + response.id, {
        assignedToUserId: userId === "Unassigned" ? null : userId,
      })
      .catch(() => {
        toast.error("Change is not saved");
      });
  };

  return (
    <>
      <Select.Root
        defaultValue={response?.assignedToUserId || "Unassigned"}
        onValueChange={assignItems}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="Unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneItems;
