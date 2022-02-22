<script lang="ts">
    import Seo from '$lib/components/Seo.svelte'
</script>

<Seo title="Cedric Gasser" keywords="Webdev Svelte Portfolio" type="Portfolio" description="Portfolio Website" image="/social_preview.png"/>

<div>
    <h1>Welcome to my portfolio website</h1>
</div>
<div>
    <h3>Yes, there is nothing here yet.</h3>
</div>

<style>
    /*design base: https://hihayk.github.io/shaper/#Nunito,%20sans-serif/1.4/1/2.98/0.8/2/0.5/314/100/46/5/0.5/2/false  */
    
    @import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
    * {
        font-family: Nunito, Roboto, system-ui, sans-serif;;
    }
    div {
        text-align: center;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    h3 {
        margin-top: 100vh;
    }
</style>
