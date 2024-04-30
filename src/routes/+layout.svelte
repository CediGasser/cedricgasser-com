<script lang="ts">
  import '$lib/assets/reset.css'
  import '$lib/assets/global.css'
  import BlurryBalls from '$lib/components/BlurryBalls.svelte'
</script>

<div class="background">
  <BlurryBalls />
</div>

<slot />

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
