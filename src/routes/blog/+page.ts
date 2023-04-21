import { getAllPosts } from "$lib/data/Blog";

export const load = async () => {
  const posts = await getAllPosts();
  return {
    posts,
  };
}