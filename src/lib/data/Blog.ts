type PostFile = {
  default: {},
  metadata: {
    title: string,
    date: string,
    publish: boolean,
  }
}

export const getAllPosts = async () => {
  const files = import.meta.glob('/src/routes/blog/*.md')
  const posts = await Promise.all(
    Object.entries(files).map(async ([path, load]) => {
      const { title, date, publish } = (await load() as PostFile).metadata
      const slug = path.split('/').slice(-1)[0].slice(0, -3) // example: 'src/routes/blog/article.md' -> 'article'

      return {
        title,
        date: new Date(date),
        publish,
        slug,
      }
    })
  )

  return posts.filter(post => post.publish)
    .filter(post => post.date <= new Date())
    .sort((a, b) => b.date.getTime() - a.date.getTime())
}