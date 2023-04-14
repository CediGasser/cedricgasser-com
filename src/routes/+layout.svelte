<script lang="ts">
    import '$lib/assets/reset.css';
    import '$lib/assets/global.css';
    import logo from '$lib/assets/logo.png'
    import PageTransition from '$lib/components/PageTransition.svelte';
    import Background from '$lib/components/Background.svelte';
    import { page } from '$app/stores';

    export let data
    let navDirection = 0;

    const onNav = () => {
        navDirection = Math.PI * Math.random() * 2;
    }
</script>


<nav class="noise-background">
    <a href="/"><img src={logo} alt="Logo" height="32" width="32"/></a>
    <div class="navLinks">
        <a href="/contact">Contact</a>
        <a href="/blog">Blog</a>
    </div>
</nav>

<Background refresh={$page.url.pathname} />

<PageTransition refresh={data.pathname} direction={navDirection} on:transitioned={onNav}>
<main>
    <slot />
</main>
</PageTransition>

<footer class="noise-background">
    <p>© {new Date().getFullYear()} Cedric Gasser</p>
    <pre class="small">Made with {'<'}3 and Svelte</pre>
</footer>

<style>
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-m);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;
    }
    
    .navLinks > a {
        margin-inline: var(--space-s);
        padding-inline: var(--textFrameX);
        padding-block: var(--textFrameY);
        text-decoration: none;
        color: var(--c-text);
        border-radius: var(--radius);
        transition: background-color 0.2s ease, box-shadow 0.2s ease;
    }

    .navLinks > a:hover {
        background-color: var(--c-overlay);
    }

    .navLinks > a:active {
        box-shadow: var(--inset-shadow);
    }

    main {
        margin-inline: auto;
        margin-top: 6rem;
        max-width: 800px;
        min-height: calc(100vh - 3rem);
        background-color: transparent;
    }

    .small {
        font-size: var(--text-xs);
    }

    footer {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
    }
</style>