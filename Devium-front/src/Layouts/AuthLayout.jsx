import { Flex, Paper } from "@mantine/core";
import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <Paper p="lg" withBorder className="max-w-md mx-auto mt-10" shadow="md">
      <Outlet />
    </Paper>
  );
}
