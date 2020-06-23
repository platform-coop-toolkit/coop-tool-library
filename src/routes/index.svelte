<script context="module">
	export async function preload({ params, query }) {
		let tools = await this.fetch(`tools.json`);
		tools = await tools.json();

		let filters = await this.fetch(`filters.json`);

		filters = await filters.json();

		let availableFilters = {}

		Object.keys(filters).forEach(function (filterName) {
			availableFilters[filterName] = {};
			availableFilters[filterName].values = filters[filterName].values;
			availableFilters[filterName].param = filterName;
			availableFilters[filterName].type = filters[filterName].type;
		})
		

		return {
			tools,
			availableFilters
		}
	}
</script>

<script>
	export let tools;
	
	import { stores } from '@sapper/app';
	const { page } = stores();

	export let availableFilters = {};	
	
	export let currentFilters = {};
	
	$: updateUrlParams(currentFilters);		

	Object.keys(availableFilters).forEach(function (filterName) {
		const filterDef = availableFilters[filterName];
		const filter = {
			param: filterDef.param,
			value: $page.query[filterDef.param] ? $page.query[filterDef.param] : "All",
			multiValue: null
		}		
		currentFilters[filterName] = filter;
	})
	
	function updateUrlParams(currentFilters) {		
		Object.keys(currentFilters).forEach(function (filterName) {
			const currentFilter = currentFilters[filterName];
			updateUrlParam(currentFilter.param, currentFilter.value);
		})
	}

	function updateUrlParam(filterParam, filterValue) {		
		if(typeof window !== 'undefined') {
		const params = new URLSearchParams(window.location.search);		
		params.set(filterParam, filterValue);
			window.history.pushState({}, "", decodeURIComponent(`${window.location.pathname}?${params}`));
		}
	}
	
	import Card from '../components/Card.svelte';
	import CheckboxGroup from '../components/CheckboxGroup.svelte';
	import RadioGroup from '../components/RadioGroup.svelte';
	import ToolList from '../components/ToolList.svelte';

</script>

<svelte:head>
	<title>Co-op Tool Library</title>
</svelte:head>

<div class="page-header">
	<div class="inside">
		<h1>Cooperative Tool Library</h1>
		<p class="subhead">Practical tools for co-ops.</p>
		<div class="calls-to-action">
			<ul>
				<li>
					<a href="#tools">Find practical tools</a><br>
					for your co-op
				</li>
				<li>
					<a href="/get-recommendations/">See other co-op’s tools</a><br>
					See other co-op’s tools
				</li>
				<li>
					<a href="/share-tools/">Share your tools</a><br>
					to help other co-ops find tools
				</li>
			</ul>
		</div>
	</div>
</div>

<div class="filter-wrapper">
	<h3>Find tools</h3>
	{#each Object.keys(availableFilters) as availableFilterKey}
	<h4>{availableFilterKey}</h4>
		{#if availableFilters[availableFilterKey].type === "exclusive"}
			<RadioGroup options={availableFilters[availableFilterKey].values} bind:activeOption={currentFilters[availableFilterKey].value} />
		{/if}
		{#if availableFilters[availableFilterKey].type === "inclusive"}
			<CheckboxGroup idPrefix={availableFilterKey} options={availableFilters[availableFilterKey].values} activeOptions={currentFilters[availableFilterKey].value.split("|")} bind:activeOptionsAsString={currentFilters[availableFilterKey].value} />		
		{/if}			
	{/each}
</div>

<div class="resource-list">	
	<ToolList tools={tools} currentFilters={currentFilters} />		
</div>
