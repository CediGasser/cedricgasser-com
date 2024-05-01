<script lang="ts">
  import { page } from '$app/stores'

  import '$lib/assets/reset.css'
  import '$lib/assets/global.css'

  import BlurryBalls from '$lib/components/BlurryBalls.svelte'
  import Sand from '$lib/components/Sand.svelte'
  

  let { children } = $props()

  const components = {
    blurryballs: BlurryBalls,
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

<div class="background">
  <svelte:component this={components[background]} />
</div>

{@render children()}

<style>
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
</style>
