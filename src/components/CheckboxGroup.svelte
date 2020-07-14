<script>
    import slugify from 'slugify';
    export let options;
    export let filterTitle;
    export let idPrefix = filterTitle;
    export const activeFiltersSeparator = "|"

    export let activeFilters = [];

    export let checkedOptions = [];

    export let activeFiltersAsString = null;

    $: handleCheckedOptions(checkedOptions);

    function handleCheckedOptions(checkedOptions) {
        if(checkedOptions.length > 0) {
            activeFilters = [].concat(checkedOptions);
        } else {
            activeFilters = ["All"];
        }
        activeFiltersAsString = activeFilters.join(activeFiltersSeparator);
    }

    function handleDeSelectAllClick() {
            checkedOptions = [];
    }

    export let isExpanded = false;

    function handleExpandClick() {
        isExpanded = !isExpanded;
    }

</script>

<div class="accordion accordion--filter-list">
    <div class="accordion__pane {isExpanded ? " accordion__pane--expanded" : ""}">
    <button class="accordion__control" aria-expanded={isExpanded} type="button" on:click={handleExpandClick}>
			{filterTitle}
			<svg class="icon icon--chevron-down" viewBox="0 0 20 20" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><path id="chevron-down" d="m10 15a1 1 0 0 1 -.71-.29l-5-5a1 1 0 0 1 1.42-1.42l4.29 4.3 4.29-4.3a1 1 0 0 1 1.42 1.42l-5 5a1 1 0 0 1 -.71.29z" fill="currentColor"></path></svg>
		</button>
        <div class="accordion__content">


            <button id={"deselect-" + idPrefix} type="button" class="button button--borderless" on:click={handleDeSelectAllClick}><span class="button__label">Deselect All<span class="screen-reader-text"> {filterTitle}</span></span></button>
            {#each options as option}
                <ul class="input-group input-group__parent">
                    <li>
                        <input bind:group={checkedOptions} id={idPrefix + "-checkbox-" +slugify(option, {lower: true})} type="checkbox" name="checkboxes" value="{option}" /><label for={idPrefix + "-checkbox-" + slugify(option, {lower: true})}>{option}</label>
                    </li>
                </ul>
            {/each}
        </div>
    </div>
</div>
