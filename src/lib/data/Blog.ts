import { json } from '@sveltejs/kit'

type PostFile = {
  default: {},
  metadata: {
    title: string,
    date: string
  }
}

export const getAllPosts = async () => {
  const files = import.meta.glob('/src/routes/blog/*.md')
  const posts = await Promise.all(
    Object.entries(files).map(async ([path, load]) => {
      const { title, date } = (await load() as PostFile).metadata
      const slug = path.split('/').slice(-1)[0].slice(0, -3) // example: 'src/routes/blog/article.md' -> 'article'

      return {
        title,
        date,
        slug,
      }
    })
  )

  return posts
}