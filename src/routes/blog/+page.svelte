<script lang="ts">
  export let data;
</script>

<h1>Enjoy my posts</h1>
<ul>
  {#each data.posts as post}
    <a href="/blog/{post.slug}">
      <h2>{post.title}</h2>
    </a>
    <p>Published: {post.date}</p>
  {:else}
    <p>No posts yet</p>
  {/each}
</ul>

<p>Blog idea from <a href="https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog">joshcollinsworth.com</a></p>