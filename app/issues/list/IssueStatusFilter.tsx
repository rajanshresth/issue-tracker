"use client";
import { Select } from "@radix-ui/themes";
import React from "react";

const Statuses: { label: string; value: string }[] = [
  { label: "All", value: "all" },
  { label: "Open", value: "open" },
  { label: "In Progress", value: "in-progress" },
  { label: "Closed", value: "closed" },
];

const IssueStatusFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by status" />
      <Select.Content>
        {Statuses.map((status) => (
          <Select.Item key={status.value} value={status.value || ""}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
