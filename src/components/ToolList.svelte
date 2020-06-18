<script>
    export let tools = [];
    export let currentFilters = {};
    export let filteredTools = [];

    import Card from './Card.svelte';

    const specialChecks = {
        niches: function(tool, propToCheck, filterValue) {
            if(filterValue === 'All') return true;
            else return Object.keys(tool.niches).includes(filterValue);    
        },
        languages: function(tool, propToCheck, filterValue) {
            if(filterValue === 'All') return true;
            if(tool.languages) {
                return tool.languages.includes(filterValue);
            } else return false;
        }         
    }

    $: updateTools(currentFilters);		

    function updateTools() {
        console.log("updateToolsList");
        filteredTools = tools.filter(function(tool) {
            return meetsFilters(currentFilters, tool);
        });
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
    {#each filteredTools as tool}                                  			            		                        
        <Card tool={tool} />
    {:else}				        
        Sorry, no matching results.
    {/each} 
</div>