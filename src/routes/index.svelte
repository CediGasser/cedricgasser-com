<script lang="ts">
    import Seo from '$lib/components/Seo.svelte'
</script>

<Seo title="Cedric Gasser" keywords="Webdev Svelte Portfolio" type="Portfolio" description="My portfolio website. One of the moste minimalistic designed website that exists, although hopefully there will be some more content in the future." image="/social_preview.png"/>

<main>
    <div class="wrapper">
        <section class="hero">
            <h1 class="text-center">Welcome to my portfolio website</h1>
        </section>
        <section class="description">
            <h2 class="text-center">One of the most minimalistic designed websites out there.</h2>
        </section>
        <section class="noContent">
            <h2 class="text-center">Yes, there is nothing here yet.</h2>
        </section>
    </div>
</main>

<style>
    /*design base: https://hihayk.github.io/shaper/#Nunito,%20sans-serif/1.4/1/2.98/0.8/2/0.5/314/100/46/5/0.5/2/false  */
    
    @import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
    * {
        font-family: Nunito, Roboto, system-ui, sans-serif;;
    }
    main {
        overflow-y: scroll;
    }
    .wrapper {
        overflow-y: scroll;
        height: 100vh;
        scroll-snap-type: y mandatory;
    }
    .wrapper > section:nth-child(even) {
        background-color: #8d8d8d;
    }
    .wrapper > section:nth-child(odd) {
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
