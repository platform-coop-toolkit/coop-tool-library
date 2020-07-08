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

	<div class="resource__meta">
		
					{#if tool.pricing }
						<div class="card__meta"><svg class="icon icon--pricing" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><use href="/images/pricing.svg#pricing" /></svg> Pricing: { tool.pricing }</div>
					{/if}

					{#if tool.languages }
						<div class="card__meta"><svg class="icon icon--language" viewBox="0 0 27 27" aria-hidden="true" focusable="false"><use href="/images/language.svg#language" /></svg> Language: { tool.languages }</div>
					{/if}				

					{#if tool.license }
						<div class="card__meta"><svg class="icon icon--license" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><use href="/images/licensing.svg#licensing" /></svg> License: { tool.license }</div>
					{/if}				
		
	</div>
</article>

