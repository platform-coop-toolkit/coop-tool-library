<script>
    const fancyConcat = require('../utils/fancy-concat.js');

    export let tool;
</script>

<article class="card">
    <header>
        {#if tool.url }
        <h2><a class="card__link" href="{ tool.url }">{ tool.name }</a></h2>
        {:else}
        <h2>{ tool.name }</h2>
        {/if}
    </header>
    <aside class="meta">
        {#if tool.nicheNames }
        <div class="card__meta"><svg class="icon icon--toolkit" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><use href="/images/toolkit.svg#toolkit" /></svg> Tool Type: { fancyConcat(tool.nicheNames) }</div>
        {/if}
        {#if tool.license }
        <div class="card__meta"><svg class="icon icon--settings" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><use href="/images/settings.svg#settings" /></svg> License: { tool.license }</div>
        {/if}
        {#if tool.pricing }
        <div class="card__meta"><svg class="icon icon--report" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><use href="/images/report.svg#report" /></svg> Pricing: { tool.pricing }</div>
        {/if}
        {#if tool.sectors && tool.sectors.length > 0 }
        <div class="card__meta"><svg class="icon icon--sector" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="/images/sector.svg#sector" /></svg> Sectors: { fancyConcat(tool.sectors) }</div>
        {/if}
        {#if tool.languages && tool.languages.length > 0 }
        <div class="card__meta"><svg class="icon icon--info" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><use href="/images/info.svg#info" /></svg> Languages: { fancyConcat(tool.languages) }</div>
        {/if}
    </aside>
</article>
