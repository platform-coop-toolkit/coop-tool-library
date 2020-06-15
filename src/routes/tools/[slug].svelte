<script context="module">
	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`tools/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { tool: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	export let tool;
</script>

<svelte:head>
	<title>{tool.name}</title>
</svelte:head>

<div class='page-header'>
	<h1>{tool.name}</h1>
</div>

<div class='content'>
</div>
