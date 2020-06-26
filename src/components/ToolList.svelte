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
            let matches = false;
            if(tool.languages) {
                let desiredValues = filterValue.split("|");
                desiredValues.forEach(function (desiredValue) {
                    if(tool.languages.includes(desiredValue)) {
                        matches = true;
                    };
                });
                return matches;
            } else return false;
        }         
    }

    $: updateFilteredTools(currentFilters);		

    function updateFilteredTools() {    
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
        else {
            // Split orables to array
            let desiredValues = filterValue.split("|");
            return desiredValues.includes(tool[propToCheck]);
        }
    }
        
</script>

<div class="cards" >			
    {#each filteredTools as tool}                                  			            		                        
        <Card tool={tool} />
    {:else}				        
        Sorry, no matching results.
    {/each} 
</div>