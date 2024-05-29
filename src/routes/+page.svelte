<script lang="ts">
  import { page } from '$app/stores'

  import BlurryBalls from '$lib/components/BlurryBalls.svelte'
  import Sand from '$lib/components/Sand.svelte'
  
  const components = {
    balls: BlurryBalls,
    sand: Sand,
  } as const

  type BackgroundVariant = keyof typeof components

  let background: BackgroundVariant = $derived.by(() => {
    const param = $page.url.searchParams.get('pls')
    const keys = Object.keys(components)

    if (param && keys.includes(param)) return param as BackgroundVariant
    return keys[keys.length * Math.random() | 0] as BackgroundVariant
  })
</script>

<main>
  <section>
    <h1>CEDRIC GASSER</h1>
  </section>
  <section>
      <svelte:component this={components[background]} />
  </section>
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100dvh;
  }

  section {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  h1 {
    font-size: 3rem;
  }
</style>
