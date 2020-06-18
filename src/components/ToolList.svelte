<script>
    export let tools = [];
    export let currentFilters = {};

    import Card from './Card.svelte';

    const specialChecks = {
        niches: function(tool, propToCheck, nicheFilter) {
            if(nicheFilter === 'All') return true;
            else return Object.keys(tool.niches).includes(nicheFilter);    
        }
    }

    function meetsFilters(filters, tool) {
        
        let meets = true;
        
        Object.keys(filters).forEach(function (filterKey) {                
            let check = meetsFilterCriteria(tool, filterKey, filters[filterKey].value)
            if(check === false) {
                meets = false;
            }
        });                

        return meets;          
    }

    function meetsFilterCriteria(tool, propToCheck, filter) {                
        if(specialChecks[propToCheck]) {
            return specialChecks[propToCheck](tool, propToCheck, filter);
        }
        if(filter === 'All') return true;
        else return tool[propToCheck] === filter;
    }
        
</script>

<div class="cards" >			
    {#each tools as tool}                          
        {#if meetsFilters(currentFilters, tool)}			            		            
            <Card tool={tool} />				
        {/if}
    {/each} 
</div>