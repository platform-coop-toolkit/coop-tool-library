<script context="module">
	export async function preload({ params, query }) {
		let tools = await this.fetch(`tools.json`);
		tools = await tools.json();

		let filters = await this.fetch(`filters.json`);

		filters = await filters.json();

		let availableFilters = {
			niche: {values: [], param: "niche"},
			pricing: {values: [], param: "pricing"},
			license: {values: [], param: "license"}
		}

		Object.keys(availableFilters).forEach(async function (filterName) {
			availableFilters[filterName].values = await filters[filterName];
		});

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

	export let availableFilters;	
	
	export let currentFilters = {};

	Object.keys(availableFilters).forEach(function (filterName) {
		const filterDef = availableFilters[filterName];
		const filter = {
			param: filterDef.param,
			value: $page.query[filterDef.param] ? $page.query[filterDef.param] : "All"
		}		
		currentFilters[filterName] = filter;
	})
	
	$: updateUrl("niche", currentFilters.niche.value);
		
	$: updateUrl("pricing", currentFilters.pricing.value);	
		
	$: updateUrl("license", currentFilters.license.value);		

	function updateUrl(filterParam, filterValue) {		
		if(typeof window !== 'undefined') {
		const params = new URLSearchParams(window.location.search);		
		params.set(filterParam, filterValue);
			window.history.pushState({}, "", decodeURIComponent(`${window.location.pathname}?${params}`));
		}
	}

	import Card from '../components/Card.svelte';
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
<div id="tools">
	<div class="niches">
		<h3>Find tools</h3>
		{#each Object.keys(availableFilters) as availableFilterKey}
		<h4>{availableFilterKey}</h4>
		<RadioGroup options={availableFilters[availableFilterKey].values} bind:activeOption={currentFilters[availableFilterKey].value} />
		{/each}
	</div>
	<ToolList tools={tools} nicheFilter={currentFilters.niche.value} pricingFilter={currentFilters.pricing.value} licenseFilter={currentFilters.license.value} />
</div>
