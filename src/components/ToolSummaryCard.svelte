<script>
    export let tool;

    import fancyConcat from '../_helpers/fancy-concat';

</script>
<article class="card" data-niche={tool.niches ? Object.keys(tool.niches).join(' ') : ''}>
    <header>
        <h2><a class="card__link" href="/tools/{tool.slug}/">{ tool.name }</a></h2>
    </header>
    <div class="meta">
        {#if tool.niches }
        <div class="card__meta"><span class="screen-reader-text">tool type: </span>
        {#each Object.keys(tool.niches) as niche}
            { niche }{#if tool.niches[niche].length > 0}: { tool.niches[niche].map(niche => niche.toLowerCase()).join(', ') }{/if}<br />
        {/each}
        </div>
        {/if}
        {#if tool.useCount > 0}
        <div class="card__meta">{ tool.usecount } { tool.usecount > 1 ? 'coops use' : 'coop uses' } it</div>
        {/if}
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
</article>
