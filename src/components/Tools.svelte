<script>
	import compareTools from '../utils/compare-tools';
    import { onMount } from 'svelte';

    let tools = [];

    onMount(async () => {
		const response = await fetch('https://demo.directory.platform.coop/api/tools/');
		tools = await response.json();
		tools.map(tool => {
			if (tool.languages_supported && tool.languages_supported.length > 0) {
				tool.languages = tool.languages_supported.map(language => {
					return language.iso_name;
				});
			}

			if (tool.niches && tool.niches.length > 0) {
				tool.nicheNames = tool.niches.map(niche => {
					return niche.name;
				});
			}

			return tool;
		});
		tools.sort(compareTools);
	});

    import Tool from './Tool.svelte';
</script>

{#if tools}
    <ul class="cards">
        {#each tools as tool}
        <li class="card__wrapper">
            <Tool tool={tool} />
        </li>
        {/each}
    </ul>
{:else}
	<p>Loading…</p>
{/if}
