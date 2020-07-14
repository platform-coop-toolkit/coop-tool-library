<script>
	import Icon from './Icon.svelte';
	export let segment;

	let ariaExpanded = false;

	const toggleMenu = () => {
		ariaExpanded = !ariaExpanded;
	}
</script>

<nav class="nav" aria-labelledby="menu-primary-label">
	<button class="button button--borderless menu-toggle" aria-expanded={ ariaExpanded } on:click={toggleMenu}><Icon icon={'menu'} iconClass={'icon--open'} /><Icon icon={'close'} /> <span id="menu-primary-label" class="menu-toggle__label">Menu</span></button>
	<ul class="menu">
		<li><a class="menu__item" rel=prefetch aria-current='{segment === undefined ? "page" : undefined}' href='.'>Browse all</a></li>
		<li><a class="menu__item" rel="external" href='https://directory.platform.coop/add/tool'>Share tools</a></li>
		<li><a class="menu__item" aria-current='{segment === "about" ? "page" : undefined}' href='about'>About</a></li>
		<li><a class="menu__item" aria-current='{segment === "glossary" ? "page" : undefined}' href='glossary'>Glossary</a></li>
	</ul>
</nav>
