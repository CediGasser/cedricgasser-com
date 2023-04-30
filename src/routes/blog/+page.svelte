<script lang="ts">
  import { formatDate } from "$lib/utils"

  export let data;
</script>

<h1>Enjoy my posts</h1>
<ul>
  {#each data.posts as post}
    <a href="/blog/{post.slug}">
      <h2>{post.title}</h2>
    </a>
    <p>{formatDate(post.date)}</p>
    <p>{post.description}</p>
  {:else}
    <p>No posts yet</p>
  {/each}
</ul>