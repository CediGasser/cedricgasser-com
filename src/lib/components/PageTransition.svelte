<script>
    import { fly } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte/internal';
    export let refresh = '';
    export let duration = 150;
    export let direction = Math.PI / 2;
    $: x = Math.cos(direction) * 100;
    $: y = Math.sin(direction) * 100;

    const dispatch = createEventDispatcher();

    $: if (refresh) {
        setTimeout(() => {
            dispatch('transitioned');
        }, duration * 2);
    }
</script>
  

{#key refresh}
<div
    in:fly="{{ y: -y, x: -x, duration: duration, delay: duration }}"
    out:fly="{{ y: y, x: x, duration: duration }}" 
    >
    <slot />
</div>
{/key}

<style>
    div {
        background-color: transparent;
    }
</style>