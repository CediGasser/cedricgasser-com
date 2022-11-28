<script lang="ts">
    import '$lib/assets/reset.css';
    import '$lib/assets/global.css';
    import logo from '$lib/assets/logo.png'
</script>

<nav>
    <a href="/"><img src={logo} alt="Logo" height="32" width="32"/></a>
    <div class="navLinks">
        <a href="/">Home</a>
        <a href="/contact">Contact</a>
        <a href="/blog">Blog</a>
    </div>
</nav>

<main>
    <slot />
</main>

<footer>
    <p>© {new Date().getFullYear()} Cedric Gasser</p>
    <pre class="small">Made with {'<'}3 and Svelte</pre>
</footer>

<style>
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: var(--c-overlay);
    }
    
    .navLinks > a {
        margin-inline: var(--space-s);
        padding-inline: var(--textFrameX);
        padding-block: var(--textFrameY);
        text-decoration: none;
        color: var(--c-text);
        border-radius: 8px;
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