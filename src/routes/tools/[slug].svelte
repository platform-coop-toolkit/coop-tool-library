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
	import fancyConcat from '../../_helpers/fancy-concat';
	import Icon from '../../components/Icon.svelte';
</script>

<svelte:head>
	<title>{tool.name}</title>
</svelte:head>

<article class="tool-detail-container">
	<div class="spacer"></div>
	<h1>{tool.name}</h1>
	<p>{tool.description}</p>
	{#if tool.use_count > 0}
        <p class="tool__meta pc-ff--sans"><Icon icon={'cooperative'} /> <strong>{ tool.use_count } { tool.use_count > 1 ? 'co-ops use' : 'co-op uses' } it</strong></p>
    {/if}
	<div class="spacer"></div>
	<hr class="is-style-hairline has-grey-400-background-color" />
	<h2>Details</h2>
	<div class="meta">
		<div class="meta__group">
		{#if tool.pricing }
			<div class="tool__meta"><Icon icon={'pricing'} /> <strong>Pricing:</strong> { tool.pricing }</div>
		{/if}
		{#if tool.license }
			<div class="tool__meta"><Icon icon={'licensing'} /> <strong>License:</strong> { tool.license }</div>
		{/if}
		{#if tool.sectors && tool.sectors.length > 0 }
			<div class="tool__meta"><Icon icon={'sector-small'} /> <strong>Sectors:</strong> { fancyConcat(tool.sectors) }</div>
		{:else}
			<div class="tool__meta"><Icon icon={'sector-small'} /> <strong>Sectors:</strong> All</div>
		{/if}
		</div>
		<div class="meta__group">
		{#if tool.languages }
			<div class="tool__meta"><Icon icon={'language-small'} /> <strong>Languages:</strong> { tool.languages }</div>
		{/if}

		{#if tool.coop_made == 'yes' }
			<div class="tool__meta"><Icon icon={'cooperative'} /> <strong>Made by a co-op</strong></div>
		{/if}
		</div>
	</div>

	<div class="spacer"></div>
	<a rel="external" class="cta" href="{tool.url}">Visit tool website</a>
	<div class="spacer"></div>
	<hr class="is-style-hairline has-grey-400-background-color" />
	<p class="tool__meta is-grey-400-color">
		<a href="https://directory.platform.coop/{ tool.id }/edit" rel="external"><Icon icon={'edit'} /> Edit tool info</a>
		<span class="last-edited">
			Last edited on { new Intl.DateTimeFormat('en-US', {month: 'long', day: 'numeric', year: 'numeric'}).format(new Date(tool.updated_at)) }.
		</span>
	</p>
</article>

