<script lang="ts">
    import Seo from '$lib/components/Seo.svelte'
</script>

<Seo title="Cedric Gasser" keywords="Webdev Svelte Portfolio" type="Portfolio" description="My portfolio website. One of the most minimalisticly designed websites that exist, although hopefully there will be some more content in the future." image="/social_preview.png"/>
<svelte:head>
    <meta name="theme-color" content="#ff9d00">
</svelte:head>


<section>
    <h1 class="text-center">Welcome to my portfolio website</h1>
</section>
<section>
    <h2 class="text-center">One of the most minimalistic designed websites out there.</h2>
</section>
<section>
    <h2 class="text-center">Yes, there is nothing here yet.</h2>
</section>

<style>
    /*design base: https://hihayk.github.io/shaper/#Nunito,%20sans-serif/1.4/1/2.98/0.8/2/0.5/314/100/46/5/0.5/2/false  */
    
    @import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
    * {
        font-family: Nunito, Roboto, system-ui, sans-serif;;
    }
    :global(body) {
        height: 100vh;
		margin: 0;
    }
    :global(body, html) {
        scroll-snap-type: y mandatory;
    }
    section:nth-child(even) {
        background-color: #8d8d8d;
    }
    section:nth-child(odd) {
        background-color: #ff9d00;
    }
    section {
        display: flex;
        justify-content: center;
        flex-direction: column;
        height: 100vh;
        scroll-snap-align: start;
    }
    .text-center {
        text-align: center;
    }
</style>
