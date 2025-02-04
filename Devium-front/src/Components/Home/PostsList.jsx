import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { fetchPosts } from "../../Api/posts";
import {
  Avatar,
  Card,
  Group,
  Image,
  Pagination,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";

const PostsList = () => {
  const [page, setPage] = useState(1);
  const posts = useQuery({
    queryKey: [
      "posts",
      {
        page,
        perPage: 12,
        sortBy: "CreatedAt",
        q: "",
      },
    ],
    queryFn: async () =>
      await fetchPosts({
        page,
        perPage: 12,
        sortBy: "CreatedAt",
        q: "",
      }),
  });
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {posts.isLoading &&
        Array.from({ length: 10 }).map((_, index) => {
          return (
            <div key={index}>
              <Card withBorder shadow="sm">
                <Card.Section>
                  <Skeleton height={300} />
                </Card.Section>
                <Skeleton height={28} />
                <Group>
                  <Group>
                    <Skeleton className="w-10 h-10" radius="50%" />
                    <Stack gap={0}>
                      <Skeleton height={20} width={100} />
                      <Skeleton height={20} width={100} />
                    </Stack>
                  </Group>
                </Group>
              </Card>
            </div>
          );
        })}
      {posts.isSuccess &&
        posts.data.data &&
        posts.data.data.data.map((post) => (
          <div key={post.id}>
            <Card withBorder shadow="sm">
              <Card.Section>
                <Image
                  height={200}
                  className="h-[300px]"
                  src={post.thumbnail}
                  alt={post.title}
                />
              </Card.Section>
              <Text size="lg">{post.title}</Text>
              <Group>
                <Group>
                  <Avatar
                    className="w-10 h-10"
                    src={post.userId.avatar}
                    alt={post.userId.name}
                  />
                  <Stack gap={0}>
                    <Text fw="600">{post.userId.name}</Text>
                    <Text>{new Date(post.createdAt).toDateString()}</Text>
                  </Stack>
                </Group>
              </Group>
            </Card>
          </div>
        ))}
      <Pagination
        onChange={setPage}
        value={page}
        total={posts.data?.data?.meta.totalPages}
      />
      ;
    </div>
  );
};

export default PostsList;
