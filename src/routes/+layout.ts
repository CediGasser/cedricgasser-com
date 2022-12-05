import type { ServerLoad } from '@sveltejs/kit'

export const prerender = true;

export const load: ServerLoad = async ({ url }) => {
    const pathname = url.pathname

    return {
        pathname,
    }
}