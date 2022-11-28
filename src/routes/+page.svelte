<script lang="ts">
    import Seo from '$lib/components/Seo.svelte'
    import socialPreview from '$lib/assets/social_preview.png'
</script>

<Seo 
    title="Cedric Gasser" 
    keywords="Webdev Svelte Portfolio" 
    type="Portfolio" 
    description="My portfolio website. One of the most minimalisticly designed websites that exist, although hopefully there will be some more content in the future." 
    image={socialPreview}
    themeColor="#ff9d00"/>

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
    }
    
    .text-center {
        text-align: center;
    }
</style>
