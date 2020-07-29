<script>
	export let status;
	export let error;

	const dev = process.env.NODE_ENV === 'development';
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<div class="page-header">
	<h1>Error {status}</h1>
</div>

<div class="grid-container--full-width">
<p>{error.message}.</p>
</div>

{#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if}
