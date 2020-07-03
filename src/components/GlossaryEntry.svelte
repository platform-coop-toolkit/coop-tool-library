<script>
    export let entry;
    export let isExpanded = false;

    function handleExpandClick() {
        isExpanded = !isExpanded;
    }

</script>

<div class="accordion__pane {isExpanded ? " accordion__pane--expanded" : ""}">
    <button class="accordion__control" aria-expanded={isExpanded} type="button" on:click={handleExpandClick}>
                {entry.term}
                <svg class="icon icon--chevron-down" viewBox="0 0 20 20" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><path id="chevron-down" d="m10 15a1 1 0 0 1 -.71-.29l-5-5a1 1 0 0 1 1.42-1.42l4.29 4.3 4.29-4.3a1 1 0 0 1 1.42 1.42l-5 5a1 1 0 0 1 -.71.29z" fill="currentColor"></path></svg>
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