/** @type {import('@sveltejs/kit').Handle} */
export async function handle({
	event,
	resolve,
}: {
	resolve: (
		e: typeof event,
		{
			transformPageChunk,
		}: {
			transformPageChunk: (chunk: { html: string }) => void;
		},
	) => Promise<void>;
	event: unknown;
}) {
	const response = await resolve(event, {
		transformPageChunk: ({ html }: { html: string }) =>
			html.replace('%unocss-svelte-scoped.global%', 'unocss_svelte_scoped_global_styles'),
	});
	return response;
}
