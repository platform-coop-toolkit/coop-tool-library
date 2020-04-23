<script>
    const fancyConcat = require('../filters/fancy-concat');
	const slugify = require('../filters/slugify');

    export let tool;
</script>

<article class="card">
    <header>
        <h2><a class="card__link" href="/tools/{ slugify(tool.name) }/">{ tool.name }</a></h2>
    </header>
    <aside class="meta">
        {#if tool.nicheNames }
        <div class="card__meta"><span class="screen-reader-text">tool type: </span><strong>{ fancyConcat(tool.nicheNames) }</strong></div>
        {/if}
		{#if tool.useCount > 0}
		<div class="card__meta">{ tool.usecount } { tool.usecount > 1 ? 'coops use' : 'coop uses' } it</div>
		{/if}
        {#if tool.pricing }
        <div class="card__meta"><svg class="icon icon--report" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><use href="/images/report.svg#report" /></svg> Pricing: { tool.pricing }</div>
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
    </aside>
</article>
