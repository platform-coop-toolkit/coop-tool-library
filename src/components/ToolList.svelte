<script>
    export let tools = [];
    export let currentFilters = {};

    import Card from './Card.svelte';

    const specialChecks = {
        niches: function(tool, valueToCheck, nicheFilter) {
            if(nicheFilter === 'All') return true;
            else return Object.keys(tool.niches).includes(nicheFilter);    
        }
    }

    function meetsFilters(filters, tool) {

        if(meetsFilterCriteria(tool, "niches", filters.niche.value) 
            && meetsFilterCriteria(tool, "pricing", filters.pricing.value)
            && meetsFilterCriteria(tool, "license", filters.license.value)) {
                return true;
            } else return false;        
    }

    function meetsFilterCriteria(tool, valueToCheck, filter) {
        if(specialChecks[valueToCheck]) {
            return specialChecks[valueToCheck](tool, valueToCheck, filter);
        }
        if(filter === 'All') return true;
        else return tool[valueToCheck] === filter;
    }
        
</script>

<div class="cards" >			
    {#each tools as tool}                          
        {#if meetsFilters(currentFilters, tool)}			            		            
            <Card tool={tool} />				
        {/if}
    {/each} 
</div>