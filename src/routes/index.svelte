<script context="module">
	export async function preload({ params, query }) {
		let tools = await this.fetch(`tools.json`);
		tools = await tools.json();

		let filters = await this.fetch(`filters.json`);

		filters = await filters.json();

		let niches = await filters.niches;

		return {
			tools,
			niches
		}
	}
</script>

<script>
	export let tools;
	export let niches;	

	import { stores } from '@sapper/app';
	const { page } = stores();

	export let nicheParam = $page.query.niche;
	
	export let nicheFilter = nicheParam ? nicheParam : "All";

	$: updateUrl(nicheFilter);

	function updateUrl(nicheFilter) {		
		if(typeof window !== 'undefined') {
		const params = new URLSearchParams(window.location.search);
		console.log(nicheFilter);
		params.set("niche", nicheFilter);
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
		<RadioGroup options={niches} bind:activeOption={nicheFilter} />
	</div>
	<ToolList tools={tools} nicheFilter={nicheFilter} />
</div>
