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

</script>

<div class="accordion accordion--filter-list">
    <div class="accordion__pane">
        <p class="accordion__heading">{filterTitle}</p>
        <div class="accordion__content">
       
        
            <button id={idPrefix + "-all-facets"} type="button" class="button button--borderless" on:click={handleDeSelectAllClick}><span class="button__label">Deselect All<span class="screen-reader-text"> {filterTitle}</span></span></button>
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