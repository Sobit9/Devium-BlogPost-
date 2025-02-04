import { Anchor, Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <form>
      <Stack>
        <TextInput label="Email" type="email" withAsterisk />
        <Stack gap={0}>
          <PasswordInput label="Password" withAsterisk />
          <Anchor
            component={Link}
            to="/auth/forgot-password"
            className="text-xs self-end"
          >
            Forgot Password?
          </Anchor>
        </Stack>
        <Button type="submit">Login</Button>
      </Stack>
    </form>
  );
}
