<script lang="ts">
  import Seo from '$lib/components/Seo.svelte'
  import socialPreview from '$lib/assets/social_preview.png'
</script>

<Seo
  title="Cedric Gasser"
  keywords="Webdev Svelte Portfolio"
  type="site"
  description="My simple site."
  image={socialPreview}
  themeColor="#ff9d00"
/>

<section>
  <h1 class="text-center">Cedric Gasser</h1>
</section>

<style>
  section {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 600px;
    height: 100vh;
  }

  h1 {
    font-size: 3rem;
  }
</style>
