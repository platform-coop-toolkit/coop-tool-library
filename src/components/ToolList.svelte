<script>
    export let tools = [];
    export let nicheFilter = 'All';

    import Card from './Card.svelte';

    function hasNiche(tool, nicheFilter) {
        if(nicheFilter === 'All') return true;
        else return Object.keys(tool.niches).includes(nicheFilter);        
    }
    
</script>

<div class="cards" >			
    {#each tools as tool}        
        {#if hasNiche(tool, nicheFilter)}							
            <Card tool={tool} />				
        {/if}
    {/each} 
</div>