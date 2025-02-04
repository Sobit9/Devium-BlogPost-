import { Button, PinInput, Stack, Text } from "@mantine/core";
import React from "react";

export default function VerifyForm() {
  return (
    <form>
      <Stack>
        <Text size="xl" fw="500" component="h1">
          Verify your email
        </Text>
        <Text>We&apos;ve sent verification code to your email</Text>
        <Text fw="bold">dcdc1836@gmail.com</Text>
        <PinInput length={6} />
        <Button type="submit">Proceed</Button>
      </Stack>
    </form>
  );
}
