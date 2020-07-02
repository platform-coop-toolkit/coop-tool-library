<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`glossary.json`).then(r => r.json()).then(glossaryEntries => {
			return { glossaryEntries };
		});
	}
</script>

<script>
	export let glossaryEntries;
</script>

<svelte:head>
	<title>Glossary</title>
</svelte:head>

<div class="page-header">
	<div class="inside">
		<h1>Glossary</h1>
	</div>
</div>

<div class="grid-container--full-width">
{#each glossaryEntries as entry}
<h2>{entry.term}</h2>
{/each}
</div>