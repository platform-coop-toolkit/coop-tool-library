<script>
    export let tools = [];
    export let nicheFilter = 'All';
    export let pricingFilter = 'All';

    import Card from './Card.svelte';

    function hasNiche(tool, valueToCheck, nicheFilter) {
        if(nicheFilter === 'All') return true;
        else return Object.keys(tool.niches).includes(nicheFilter);        
    }

    function meetsFilterCriteria(tool, valueToCheck, filter, checkFunction) {
        if(checkFunction) {
            return checkFunction(tool, valueToCheck, filter);
        }
        if(filter === 'All') return true;
        else return tool[valueToCheck] === filter;
    }
        
</script>

<div class="cards" >			
    {#each tools as tool}        
        {#if hasNiche(tool, "niches", nicheFilter, hasNiche) && meetsFilterCriteria(tool, "pricing", pricingFilter)}							
            <Card tool={tool} />				
        {/if}
    {/each} 
</div>