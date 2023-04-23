<script>
  import '$lib/assets/prism-theme.css'

  export let data;
  const { title, date, Content } = data;
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<article>
  <h1>{title}</h1>
  <p>Published: {date}</p>
  <Content />
</article>

<style>
  article {
    margin-bottom: 200px;
  }
</style>