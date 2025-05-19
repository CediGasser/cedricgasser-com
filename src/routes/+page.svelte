<script lang="ts">
  import { page } from '$app/stores'
  import { Github } from '$lib/components/icons'
  import { browser } from '$app/environment'

  import BlurryBalls from '$lib/components/BlurryBalls.svelte'
  import Sand from '$lib/components/Sand.svelte'

  const components = {
    balls: BlurryBalls,
    sand: Sand,
  } as const

  type BackgroundVariant = keyof typeof components

  let background: BackgroundVariant = $derived.by(() => {
    const param = browser ? $page.url.searchParams.get('pls') : null
    const keys = Object.keys(components)

    if (param && keys.includes(param)) return param as BackgroundVariant
    return keys[(keys.length * Math.random()) | 0] as BackgroundVariant
  })
</script>

<main>
  <section>
    <div>
      <h1>CEDRIC GASSER</h1>
      <div class="icon-links">
        <Github href="https://github.com/CediGasser" />
      </div>
    </div>
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
    background: radial-gradient(circle at 75%, #161616, #000000 50%);
  }

  section {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .icon-links {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    justify-content: end;
    width: 100%;
  }

  h1 {
    font-size: 3rem;
    background: linear-gradient(
      90deg,
      rgb(129, 3, 232) 0%,
      rgb(198, 0, 145) 50%,
      rgb(231, 0, 77) 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }

  @media (max-width: 768px) {
    main {
      flex-direction: column;
      background: radial-gradient(circle at 50% 75%, #161616, #000000 50%);
    }

    h1 {
      font-size: 2rem;
    }
  }
</style>
