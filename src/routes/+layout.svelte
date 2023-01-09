<script lang="ts">
    import '$lib/assets/reset.css';
    import '$lib/assets/global.css';
    import logo from '$lib/assets/logo.png'
    import type { PageData } from './$types';
    import PageTransition from '$lib/components/PageTransition.svelte';
    import Background from '$lib/components/Background.svelte';

    export let data: PageData
    let navDirection = 0;
    let background;

    const onNav = () => {
        navDirection = Math.PI * Math.random() * 2;
        background.pulseDeterent();
    }
</script>


<nav>
    <a href="/"><img src={logo} alt="Logo" height="32" width="32"/></a>
    <div class="navLinks">
        <a href="/">Home</a>
        <a href="/contact">Contact</a>
        <a href="/blog">Blog</a>
    </div>
</nav>

<Background bind:this={background} />

<PageTransition refresh={data.pathname} direction={navDirection} on:transitioned={onNav}>
<main>
    <slot />
</main>
</PageTransition>

<footer>
    <p>© {new Date().getFullYear()} Cedric Gasser</p>
    <pre class="small">Made with {'<'}3 and Svelte</pre>
</footer>

<style>
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-m);
        background-color: var(--c-overlay);
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
        background-color: var(--c-overlay);
    }
</style>