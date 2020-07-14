<script>
	import GlobalNav from '../components/GlobalNav.svelte';
	import Nav from '../components/Nav.svelte';
	import Icon from '../components/Icon.svelte';

	export let segment;
</script>

<style lang="scss" global>
	@import "./style/app.scss";
</style>

<header role="banner">
	<div class="container">
		<GlobalNav />
		<a href="/" class="link link--brand"><Icon icon={'tools'} viewBox={'0 0 32 32'} /> <span class="brand__title screen-reader-text">Cooperative Tool Library</span></a>
		<div class="inner">
			<Nav {segment}/>
		</div>
	</div>
</header>

<div class="wrap container archive archive--tools" role="document">
	<div class="content">
		<main>
			<slot></slot>
		</main>
	</div>
</div>
