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
	
	$: updateUrl(currentFilters);		

	Object.keys(availableFilters).forEach(function (filterName) {
		const filterDef = availableFilters[filterName];
		const filter = {
			param: filterDef.param,
			value: $page.query[filterDef.param] ? $page.query[filterDef.param] : "All",
			multiValue: null
		}		
		currentFilters[filterName] = filter;
	})
	
	function updateUrl(currentFilters) {		
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

	export let filtersExpanded = false;	

	function handleShowFiltersClick() {
		filtersExpanded = true;
	}
	
	function handleHideFiltersClick() {
		filtersExpanded = false;
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
		<div class="color has-blue-500-background-color">		
			<h2>View by category</h2>
			<RadioGroup options={availableFilters.niches.values} bind:activeOption={currentFilters.niches.value} />
		</div>
	</div>		
</div>

<div class="filter-wrapper">
	
	<button on:click={handleShowFiltersClick} id="show-filters" type="button" class="button button--borderless"><svg class="icon icon--filter" aria-hidden={filtersExpanded} viewBox="0 0 20 20" focusable="false">
        <use href="/images/filter.svg#filter" />
    </svg>
    <span class="button__label">Filter</span></button>

	<div class="filters{filtersExpanded ? " filters--expanded" : ""}">
		<button on:click={handleHideFiltersClick} id="hide-filters" type="button" class="button button--borderless button--inverse"><span class="button__label">Close</span><svg class="icon icon--close" aria-hidden={filtersExpanded} viewBox="0 0 20 20" focusable="false">
				<use href="/images/close.svg#close" />
			</svg>
		</button>
		<form class="form" action="/">
			<h2 class="h1 screen-reader-text">Filters</h2>
			{#each Object.keys(availableFilters) as availableFilterKey}	
				{#if availableFilters[availableFilterKey].type === "inclusive"}					
					<CheckboxGroup filterTitle={availableFilterKey} options={availableFilters[availableFilterKey].values} checkedOptions={currentFilters[availableFilterKey].value.split("|")} bind:activeFiltersAsString={currentFilters[availableFilterKey].value} />		
				{/if}			
			{/each}			
		</form>
	</div>	
</div>

<div class="resource-list">	
	<ToolList tools={tools} currentFilters={currentFilters} />		
</div>
