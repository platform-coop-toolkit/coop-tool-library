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
	{#if tool.useCount > 0}
        <div class="card__meta">{ tool.usecount } { tool.usecount > 1 ? 'coops use' : 'coop uses' } it</div>
    {/if}
	<div class="spacer"></div>
	<hr />
	<h2>Details</h2>

	<div class="meta">

					{#if tool.pricing }
						<div class="card__meta"><Icon icon={'pricing'} /> Pricing: { tool.pricing }</div>
					{/if}

					{#if tool.languages }
						<div class="card__meta"><Icon icon={'language-small'} /> Language: { tool.languages }</div>
					{/if}

					{#if tool.license }
						<div class="card__meta"><Icon icon={'licensing'} /> License: { tool.license }</div>
					{/if}

					{#if tool.sectors && tool.sectors.length > 0 }
        				<div class="card__meta"><Icon icon={'sector-small'} /> Sector: { fancyConcat(tool.sectors) }</div>
        			{/if}
	</div>

	<div class="spacer"></div>
	<a rel="external" class="cta" href="{tool.url}">Visit tool website</a>
</article>

