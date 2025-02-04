import { Box, Button, Container, Group } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Common/Logo";

export default function Navbar() {
  return (
    <Box className="border-b md:block hidden">
      <Container component={"header"} size="xl">
        <Group justify="space-between" className="h-16" align="center">
          <Link to="/">
            <Logo className="h-12 w-12" />
          </Link>
          <Group h="100%" gap={0} visibleFrom="sm">
            <Button component={Link} to="/" variant="subtle">
              Home
            </Button>
            <Button variant="subtle">Categories</Button>
            <Button variant="subtle">Authors</Button>
          </Group>
          <Group h="100%" gap={5}>
            <Button component={Link} to="/auth/login" variant="outline">
              Login
            </Button>
            <Button component={Link} to="/auth/register">
              Register
            </Button>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
