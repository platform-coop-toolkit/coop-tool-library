<script>
    import { onMount } from 'svelte';

    let tools = [];

    onMount(async () => {
		const response = await fetch('https://demo.directory.platform.coop/api/tools/');
		tools = await response.json();
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
