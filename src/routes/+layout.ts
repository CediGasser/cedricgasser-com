export const prerender = true;

export const load = async ({ url }) => {
    const pathname = url.pathname

    return {
        pathname,
    }
}