"use client";
import { schema } from "@/app/validationSchema";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Response } from "@prisma/client";
import { Button, Callout, TextField, TextFieldInput } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaInfoCircle } from "react-icons/fa";
import SimpleMdeReact from "react-simplemde-editor";
import { z } from "zod";

type Inputs = z.infer<typeof schema>;

const IssueForm = ({ issue }: { issue?: Response }) => {
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();
  return (
    <div>
      {error && (
        <Callout.Root color="red" className="px-10">
          <Callout.Icon>
            <FaInfoCircle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="p-5 space-y-5"
        onSubmit={handleSubmit(async (data) => {
          try {
            setSubmitting(true);
            if (issue) await axios.patch(`/api/response/${issue.id}`, data);
            else await axios.post("/api/response", data);
            router.push("/response");
            router.refresh();
          } catch (error) {
            setSubmitting(false);
            setError("Unexpected error");
          }
        })}
      >
        <TextField.Root>
          <TextFieldInput
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
            className="max-w-xl "
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          control={control}
          name="description"
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMdeReact placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={submitting}>
          New add{submitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
