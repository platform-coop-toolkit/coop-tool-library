<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`tools.json`).then(r => r.json()).then(tools => {
			return { tools };
		});
	}
</script>

<script>
	export let tools;
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<h1>Tools</h1>

<ul>
	{#each tools as tool}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li><a rel='prefetch' href='tools/{tool.slug}'>{tool.name}</a></li>
	{/each}
</ul>
