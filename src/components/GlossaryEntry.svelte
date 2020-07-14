<script>
	import Icon from './Icon.svelte';

    export let entry;
    export let isExpanded = false;

    function handleExpandClick() {
        isExpanded = !isExpanded;
    }

</script>

<div class="accordion__pane {isExpanded ? " accordion__pane--expanded" : ""}">
    <button class="accordion__control" aria-expanded={isExpanded} type="button" on:click={handleExpandClick}>
                {entry.term}
                <Icon icon={'chevron-down'} />
            </button>
        <div class="accordion__content">
            {#if entry.glossaryDefinition}
                <p>{entry.glossaryDefinition}</p>
            {/if}
            {#if entry.toolExplanation}
                <p>{entry.toolExplanation}</p>
            {/if}
        </div>
</div>
<div class="spacer"></div>
