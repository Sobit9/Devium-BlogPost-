import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Layouts/Navbar";
import { Container } from "@mantine/core";

export default function AppLayout() {
  return (
    <div>
      <Navbar />
      <Container size="xl">
        <Outlet />
      </Container>
    </div>
  );
}
