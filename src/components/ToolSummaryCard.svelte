<script>
    export let tool;

	import fancyConcat from '../_helpers/fancy-concat';

	import Icon from './Icon.svelte';

	import { fade } from 'svelte/transition';

	let down, up, link;

	const downHandler = () => {
		down = +new Date();
	}

	const upHandler = () => {
		up = +new Date();
		if ( 200 > ( up - down ) ) {
			link.click();
		}
	}
</script>
<li class="card__wrapper">
<article transition:fade|local class="card card--tool" data-niche={tool.niches ? Object.keys(tool.niches).join(' ') : ''} on:mousedown={downHandler} on:mouseup={upHandler}>
    <header>
        <h3 class="card__title"><a bind:this={link} class="card__link" href="/tools/{tool.slug}/">{ tool.name }</a></h3>
    </header>
    <div class="meta">
        {#if tool.niches }
        <div class="card__meta card__tool-type"><span class="screen-reader-text">tool type: </span>
        {#each Object.keys(tool.niches) as niche}
            { niche }{#if tool.niches[niche].length > 0}: { tool.niches[niche].map(niche => niche.toLowerCase()).join(', ') }{/if}<br />
        {/each}
        </div>
        {/if}
        {#if tool.use_count > 0}
        <div class="card__meta">{ tool.use_count } { tool.use_count > 1 ? 'co-ops use' : 'co-op uses' } it</div>
        {/if}
        {#if tool.pricing }
        <div class="card__meta"><Icon icon={'pricing'} /> <span class="screen-reader-text">pricing: </span>{ tool.pricing }</div>
        {/if}
        {#if tool.license_type == 'proprietary'}
		<div class="card__meta"><Icon icon={'licensing'} /> <span class="screen-reader-text">license: </span>Proprietary</div>
		{:else if tool.license_type == 'proprietary-with-floss-integration-tools'}
        <div class="card__meta"><Icon icon={'licensing'} /> <span class="screen-reader-text">license: </span> Proprietary with { tool.license } integration tools</div>
		{:else if tool.license_type == 'floss'}
		<div class="card__meta"><Icon icon={'licensing'} /> <span class="screen-reader-text">license: </span>{ tool.license }</div>
        {/if}
        {#if tool.sectors && tool.sectors.length > 0 }
        <div class="card__meta"><Icon icon={'sector-small'} /> <span class="screen-reader-text">sector: </span>{ fancyConcat(tool.sectors) }</div>
        {/if}
        {#if tool.languages && tool.languages.length > 0 }
        <div class="card__meta"><Icon icon={'language-small'} /> <span class="screen-reader-text">languages supported: </span>{ fancyConcat(tool.languages) }</div>
        {/if}
    </div>
</article>
</li>
