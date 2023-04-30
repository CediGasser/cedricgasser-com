import type { Post } from '$lib/types.js';

export const load = async ({ params }) => {
  const post = await import(`../../../posts/${params.slug}/${params.slug}.md`)
  const metadata: Omit<Post, 'slug'> = post.metadata
  const Content = post.default

  return {
    Content,
    ...metadata
  }
};