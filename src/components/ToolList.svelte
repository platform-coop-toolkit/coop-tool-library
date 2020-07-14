<script>
    export let tools = [];
    export let currentFilters = {};
    export let filteredTools = [];
    export let searchTerm = "";

    import ToolSummaryCard from './ToolSummaryCard.svelte';

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

    $: updateFilteredTools(currentFilters, searchTerm);

    function updateFilteredTools() {
        filteredTools = tools.filter(function(tool) {
            return (meetsFilters(currentFilters, tool) && meetsSearchTerm(searchTerm, tool));
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

    function meetsSearchTerm(searchTerm, tool) {
        if (searchTerm === "") {
            return true;
        }
        let meets = false;
        let searchFields = [
            "name",
            "description"
        ]
        searchFields.forEach(function (searchField) {
            if(tool[searchField].toLowerCase().includes(searchTerm.toLowerCase())) {
                meets = true;
            }
        })

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

<div class="spacer"></div>
<div role="alert">
	<p class="h3">{ filteredTools.length } {#if filteredTools.length > 1}tools{:else}tool{/if} matched</p>
</div>
<div class="cards" >
    {#each filteredTools as tool}
        <ToolSummaryCard tool={tool} />
    {:else}
        Sorry, no matching results.
    {/each}
</div>
