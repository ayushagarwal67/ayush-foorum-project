import { formatDistanceToNowStrict, parseISO } from 'date-fns';
import type { Post, User } from './types';
import { DEMO_POSTS, DEMO_USERS } from './constant';

export const initializeLocalStorage = () => {
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(DEMO_USERS));
    }
    if (!localStorage.getItem("posts")) {
        localStorage.setItem("posts", JSON.stringify(DEMO_POSTS));
    }
};

export const getUsers = (): User[] => {
    return JSON.parse(localStorage.getItem("users") || "[]");
};

export const addUser = (user: User) => {
    const users = getUsers();
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
};

export const getUserByEmail = (email: string): User | null => {
    const users = getUsers();
    return users.find(u => u.email === email) || null;
};

export const getPosts = (): Post[] => {
    return JSON.parse(localStorage.getItem("posts") || "[]");
};

export const getPostsByEmail = (email: string): Post[] => {
    const posts = getPosts();
    return posts.filter(p => p.email === email);
};

export const addPost = (post: Post) => {
    const posts = getPosts();
    posts.unshift(post); // Add to beginning
    localStorage.setItem("posts", JSON.stringify(posts));
};

export const isValidEmail = (email: string): boolean => {
    return /^\S+@\S+\.\S+$/.test(email);
};

export const isValidPassword = (password: string): boolean => {
    return password.length >= 6;
};

export function timeAgo(timestamp: string): string {
    return formatDistanceToNowStrict(parseISO(timestamp), { addSuffix: true });
}

