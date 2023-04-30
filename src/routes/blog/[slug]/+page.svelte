<script>
  import '$lib/assets/prism-theme.css'
  import { formatDate } from '$lib/utils'

  export let data;
  const { title, date, Content } = data;
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<article>
  <h1>{title}</h1>
  <p>{formatDate(date)}</p>
  <Content />
</article>

<style>
  article {
    margin-bottom: 200px;
  }
</style>