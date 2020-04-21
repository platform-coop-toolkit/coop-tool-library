<script>
    const fetchTools = (async () => {
        const response = await fetch('/data.json')
        return await response.json()
    })()

    import Tool from './Tool.svelte';
</script>

{#await fetchTools}
	<p>Loading…</p>
{:then tools}
    <ul class="cards">
        {#each tools as tool}
        <li class="card__wrapper">
            <Tool tool={tool} />
        </li>
        {/each}
    </ul>
{:catch error}
	<p>An error occurred!</p>
{/await}
