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

	import Icon from '../components/Icon.svelte';

	import { stores } from '@sapper/app';
	const { page } = stores();

	export let availableFilters = {};

	export let currentFilters = {};

	export let searchTerm = $page.query["s"] ? $page.query["s"] : "";

	$: updateFilterUrl(currentFilters);

	Object.keys(availableFilters).forEach(function (filterName) {
		const filterDef = availableFilters[filterName];
		const filter = {
			param: filterDef.param,
			value: $page.query[filterDef.param] ? $page.query[filterDef.param] : "All",
			multiValue: null
		}
		currentFilters[filterName] = filter;
	})

	$: updateSearchUrl(searchTerm);

	function updateSearchUrl(searchTerm) {
		updateUrlParam("s", searchTerm);
	}

	function updateFilterUrl(currentFilters) {
		Object.keys(currentFilters).forEach(function (filterName) {
			const currentFilter = currentFilters[filterName];
			updateUrlParam(currentFilter.param, currentFilter.value);
		})
	}

	function updateUrlParam(paramName, paramValue) {
		if(typeof window !== 'undefined') {
		const params = new URLSearchParams(window.location.search);
		params.set(paramName, paramValue);
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
		<p class="subhead">A place for co-ops to find and share digital tools with each other.</p>
		<div class="spacer"></div>
		<div class="calls-to-action">
			<ul>
				<li>
					<a class="link" href="#tools">
						<Icon icon={'browse'} iconClass={'icon--lg'} viewBox={'0 0 40 40'} /><br />
						<span class="h4">Find practical tools</span><br />
						for your co-op
					</a>
				</li>
				<li>
					<a class="link" rel="external" href="https://directory.platform.coop/add/tool">
						<Icon icon={'share-tools'} iconClass={'icon--lg'} viewBox={'0 0 40 40'} /><br />
						<span class="h4">Share your tools</span><br />
						to help other co-ops find tools
					</a>
				</li>
			</ul>
		</div>
	</div>
</div>

<div class="has-blue-500-background-color home__search">
	<form role="search" method="get" class="search-form search-form--inverse" action="/">
		<label>
			<span class="screen-reader-text">search</span>
			<input id="s" name="s" type="search" placeholder="Search tools…" bind:value={searchTerm} />
		</label>
		<button type="submit" class="button button--search"><span class="screen-reader-text">submit search</span><Icon icon={'search'} />
		</button>
	</form>
	<form id="tools" class="form" action="/">
		<h2>View by category</h2>
		<RadioGroup options={availableFilters.niches.values} bind:activeOption={currentFilters.niches.value} />
	</form>
	<div class="spacer"></div>
</div>


<div class="filter-wrapper">

	<button on:click={handleShowFiltersClick} id="show-filters" type="button" class="button button--borderless"><Icon icon={'filter'} />
	<span class="button__label">Filter</span></button>

	<div class="filters{filtersExpanded ? " filters--expanded" : ""}">
		<button on:click={handleHideFiltersClick} id="hide-filters" type="button" class="button button--borderless button--inverse"><span class="button__label">Close</span><Icon icon={'close'} />
		</button>
		<form class="form" action="/">
			<h2 class="h1">Filters</h2>
			{#each Object.keys(availableFilters) as availableFilterKey}
				{#if availableFilters[availableFilterKey].type === "inclusive"}
					<CheckboxGroup filterTitle={availableFilterKey.replace(/^\w/, (c) => c.toUpperCase())} options={availableFilters[availableFilterKey].values} checkedOptions={currentFilters[availableFilterKey].value.split("|")} bind:activeFiltersAsString={currentFilters[availableFilterKey].value} />
				{/if}
			{/each}
		</form>
	</div>
</div>

<div class="resource-list">
	<ToolList tools={tools} currentFilters={currentFilters} searchTerm={searchTerm} />
</div>
