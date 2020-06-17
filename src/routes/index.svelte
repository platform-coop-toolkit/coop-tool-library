<script context="module">
	export async function preload({ params, query }) {
		let tools = await this.fetch(`tools.json`);
		tools = await tools.json();

		let niches = await this.fetch(`niches.json`);
		niches = await niches.json();

		return {
			tools,
			niches
		}
	}
</script>

<script>
	export let tools;
	export let niches;
	export let nicheFilter = "All";

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
