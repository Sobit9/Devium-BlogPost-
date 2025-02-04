import { Anchor, Text } from "@mantine/core";
import React from "react";
import LoginForm from "../../Components/Forms/Login/LoginForm";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div>
      <Text size="xl" fw="500" component="h1">
        Welcome back
      </Text>
      <Text size="sm">Please login to your Account</Text>
      <LoginForm />
      <Anchor component={Link} to="/auth/register">
        Don&apos;t have an account? Register
      </Anchor>
    </div>
  );
}
