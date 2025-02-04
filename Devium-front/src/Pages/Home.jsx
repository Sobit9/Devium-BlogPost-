import { useQuery } from "@tanstack/react-query";
import React from "react";
import PostsList from "../Components/Home/PostsList";

export default function Home() {
  return (
    <div>
      <PostsList />
    </div>
  );
}
