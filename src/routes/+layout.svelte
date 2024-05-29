<script lang="ts">
  import '$lib/assets/reset.css'
  import '$lib/assets/global.css'

  import Seo from '$lib/components/Seo.svelte'
  import socialPreview from '$lib/assets/social_preview.png'
  
  let { children } = $props()
</script>

<Seo
  title="Cedric Gasser"
  keywords="Webdev Svelte Portfolio"
  type="site"
  description="My simple site."
  image={socialPreview}
/>

{@render children()}
