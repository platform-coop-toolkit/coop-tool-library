<script>
	import GlobalNav from '../components/GlobalNav.svelte';
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style lang="scss" global>
	@import "./style/app.scss";
</style>

<header role="banner">
	<div class="container">
		<GlobalNav />
		<a href="/" class="link link--brand"><svg viewBox="0 0 32 32" class="icon icon--tools" aria-hidden="true" focusable="true"><use href="/images/tools.svg#tools"></use></svg> <span class="brand__title screen-reader-text">Cooperative Tool Library</span></a>
		<div class="inner">
			<Nav {segment}/>
		</div>
	</div>
</header>

<div class="wrap container search-results" role="document">
	<div class="content">
		<main>
			<slot></slot>
		</main>
	</div>
</div>
