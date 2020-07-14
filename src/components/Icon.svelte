<script>
export let icon;
export let iconClass = false;
export let viewBox = '0 0 20 20';
export let ariaHidden = true;
export let focusable = false;
</script>

<svg
	class="icon icon--{ icon } { iconClass }"
	viewBox={ viewBox }
	aria-hidden={ ariaHidden }
	focusable={ focusable }
>
	<use href="/images/{ icon }.svg#{ icon }" />
</svg>
