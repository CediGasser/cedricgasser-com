import { json } from "@sveltejs/kit"
import type { Post } from "$lib/types"

type GlobEntry = { 
  default: unknown, 
  metadata: Omit<Post, 'slug'>
}

const getPosts = async () => {
  const files = import.meta.glob<GlobEntry>('/src/posts/*/*.md', { eager: true })
  let posts: Post[] = []

  Object.entries(files).map(async ([path, file]) => {
    const slug = path.split('/').slice(-1)[0].slice(0, -3) // example: 'src/routes/blog/article.md' -> 'article'
    let post: Post = {
      ...file.metadata,
      slug: slug
    }

    if (post.publish) {
      posts.push(post)
    }
  })

  return posts
}

export const GET = async ({ url }) => {
  let posts = await getPosts()

  if (url.searchParams.has('tag')) {
    const tag = url.searchParams.get('tag')
    posts = posts.filter(post => post.tags.includes(tag))
  }

  if (url.searchParams.has('q')) {
    const query = url.searchParams.get('q').toLowerCase()

    posts = posts.filter(post => 
      post.title.toLowerCase().includes(query)
      || post.description.toLowerCase().includes(query)
    )
  }

  return json(posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
}