<script>
    import slugify from 'slugify';
    export let options;
    export let idPrefix;
    export const allValue = "All"

    export let activeOptions = [];

    export let activeOptionsAsString = null;

    $: handleActiveOptions(activeOptions);

    function handleActiveOptions(activeOptions) {        
        if(activeOptions.includes(allValue)) {            
            activeOptions = [allValue];
        }
        activeOptionsAsString = activeOptions.join("|");           
    }

</script>
<ul class="input-group checkbox">
    {#each options as option}
        <li>
            <input bind:group={activeOptions} id={idPrefix + "-checkbox-" +slugify(option, {lower: true})} type="checkbox" name="checkboxes" value="{option}" /><label for={idPrefix + "-checkbox-" + slugify(option, {lower: true})}>{option}</label>
        </li>    
    {/each}        
</ul>
