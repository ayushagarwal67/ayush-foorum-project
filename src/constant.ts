import type { Post, User } from "./types";

export const DEMO_USERS: User[] = [
    { email: "demo@example.com", password: "password123" },
    { email: "test@user.com", password: "testpass" },
];
  
export const DEMO_POSTS: Post[] = [
    {
      id: 1,
      email: "demo@example.com",
      author: "Demo User",
      content: "This is my first post!",
      timestamp: new Date(Date.now() - 2 * 3600e3).toISOString(),
    },
    {
      id: 2,
      email: "demo@example.com",
      author: "Demo User",
      content: "Having a great day!",
      timestamp: new Date(Date.now() - 3600e3).toISOString(),
    },
    {
      id: 3,
      email: "test@user.com",
      author: "Test User",
      content: "Hello world from test user!",
      timestamp: new Date(Date.now() - 30 * 60e3).toISOString(),
    },
];

export const PREVIEW_LENGTH = 200;