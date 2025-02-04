import {
  Button,
  FileInput,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";

export default function RegisterForm() {
  const [file, setFile] = useState("");
  return (
    <form>
      <Stack className="py-2">
        <FileInput onChange={setFile} label="Avatar" accept="image/*">
          {(props) => <Button {...props}>Upload your profile pic</Button>}
        </FileInput>
        {file && <Text>{file.name}</Text>}
      </Stack>
      <Stack>
        <TextInput label="Name" type="text" withAsterisk />
        <TextInput label="Username" type="text" withAsterisk />
        <TextInput label="Email" type="email" withAsterisk />
        <Stack gap={0}>
          <PasswordInput label="Password" withAsterisk />
        </Stack>
        <Stack gap={0}>
          <PasswordInput label="ConfirmPassword" withAsterisk />
        </Stack>
        <Button type="submit">Register</Button>
      </Stack>
    </form>
  );
}
