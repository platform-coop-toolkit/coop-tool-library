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

</script>

<svelte:head>
	<title>{tool.name}</title>
</svelte:head>

<div class="tool-detail-container">	
	<div class="spacer"></div>
	<h1>{tool.name}</h1>
	<p>{tool.description}</p>
	{#if tool.useCount > 0}
        <div class="card__meta">{ tool.usecount } { tool.usecount > 1 ? 'coops use' : 'coop uses' } it</div>
    {/if}
	<div class="spacer"></div>
	<hr />
	<h2>Details</h2>	
	{#if tool.pricing }
		<div class="card__meta"><svg class="icon icon--pricing" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><use href="/images/report.svg#report" /></svg> Pricing: { tool.pricing }</div>
	{/if}
	{#if tool.license }
		<div class="card__meta"><svg class="icon icon--settings" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><use href="/images/settings.svg#settings" /></svg> Licensing: { tool.license }</div>
	{/if}
	{#if tool.sectors && tool.sectors.length > 0 }
		<div class="card__meta"><svg class="icon icon--sector" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="/images/sector.svg#sector" /></svg> Sector: { fancyConcat(tool.sectors) }</div>
	{/if}
	{#if tool.languages && tool.languages.length > 0 }
		<div class="card__meta"><svg class="icon icon--info" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><use href="/images/info.svg#info" /></svg> Language: { fancyConcat(tool.languages) }</div>
	{/if}
	
</div>

