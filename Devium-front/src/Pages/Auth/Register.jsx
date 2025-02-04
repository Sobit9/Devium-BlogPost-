import { Anchor, Text } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "./../../Components/Forms/Register/RegisterForm";

export default function Register() {
  return (
    <div>
      <Text size="xl" fw="500" component="h1">
        Welcome back
      </Text>
      <Text size="sm">Please Create your Account</Text>
      <RegisterForm />
      <Anchor component={Link} to="/auth/login">
        Already have an account? Login
      </Anchor>
    </div>
  );
}
