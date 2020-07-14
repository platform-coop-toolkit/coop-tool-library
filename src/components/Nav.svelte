<script>
	export let segment;
</script>

<nav class="nav" aria-labelledby="menu-primary-label">
	<button class="button button--borderless menu-toggle" aria-expanded="false"><svg viewBox="0 0 20 20" class="icon icon--open" aria-hidden="true" focusable="true"><use href="/images/menu.svg#menu"></use></svg> <svg viewBox="0 0 20 20" class="icon icon--close" aria-hidden="true" focusable="true"><use href="/images/close.svg#close"></use></svg> <span id="menu-primary-label" class="menu-toggle__label">Menu</span></button>
	<ul class="menu">
		<li><a class="menu__item" rel=prefetch aria-current='{segment === undefined ? "page" : undefined}' href='.'>Browse all</a></li>
		<li><a class="menu__item" rel="external" href='https://directory.platform.coop/add/tool'>Share tools</a></li>
		<li><a class="menu__item" aria-current='{segment === "about" ? "page" : undefined}' href='about'>About</a></li>
		<li><a class="menu__item" aria-current='{segment === "glossary" ? "page" : undefined}' href='glossary'>Glossary</a></li>
	</ul>
</nav>
