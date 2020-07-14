<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`glossary.json`).then(r => r.json()).then(glossaryEntries => {
			return { glossaryEntries };
		});
	}
</script>

<script>

	import sortByAlphabetical from '../_helpers/sort-by-alphabetical';

	export let glossaryEntries;

	export let displayedEntries;

	export let categories = [];

	$:createCategories(glossaryEntries) 
	
	function createCategories(glossaryEntries) {
		glossaryEntries.forEach(function(entry) {
			if(!categories.includes(entry.category)) {
				categories.push(entry.category);
			}
		})
		categories.sort(function (a,b) {
			return sortByAlphabetical(a,b,false);
		});
	}

	$:updateDisplayedEntries(glossaryEntries);

	function updateDisplayedEntries(glossaryEntries) {
		displayedEntries = [].concat(glossaryEntries);
	}

	import GlossaryEntry from '../../components/GlossaryEntry.svelte';

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
{#each categories as category}
<h2>{category}</h2>
{#each displayedEntries as entry}
	{#if entry.category === category}		
		<GlossaryEntry entry={entry} />
	{/if}
{/each}
{/each}
</div>