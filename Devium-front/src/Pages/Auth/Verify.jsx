import { Anchor, Text } from "@mantine/core";
import React from "react";
import LoginForm from "../../Components/Forms/Login/LoginForm";
import { Link } from "react-router-dom";
import VerifyForm from "../../Components/Forms/Verify/VerifyForm";

export default function Verify() {
  return (
    <div>
      <Text size="sm">Please verify your Account</Text>
      <VerifyForm />
      <Anchor component={Link} to="/auth/login">
        Already have an account? Login
      </Anchor>
    </div>
  );
}
