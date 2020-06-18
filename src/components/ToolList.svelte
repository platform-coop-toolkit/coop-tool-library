<script>
    export let tools = [];
    export let currentFilters = {};

    import Card from './Card.svelte';

    const specialChecks = {
        niches: function(tool, propToCheck, filterValue) {
            if(filterValue === 'All') return true;
            else return Object.keys(tool.niches).includes(filterValue);    
        },
        languages: function(tool, propToCheck, filterValue) {
            if(filterValue === 'Any') return true;
            if(tool.languages) {
                return tool.languages.includes(filterValue);
            } else return false;
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

    function meetsFilterCriteria(tool, propToCheck, filterValue) {                
        if(specialChecks[propToCheck]) {
            return specialChecks[propToCheck](tool, propToCheck, filterValue);
        }
        if(filterValue === 'All') return true;
        else return tool[propToCheck] === filterValue;
    }
        
</script>

<div class="cards" >			
    {#each tools as tool}                          
        {#if meetsFilters(currentFilters, tool)}			            		            
            <Card tool={tool} />				
        {/if}
    {/each} 
</div>