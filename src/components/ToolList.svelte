<script>
    export let tools = [];
    export let nicheFilter = 'All';

    import Card from './Card.svelte';

</script>

<div class="cards">			
    {#if nicheFilter === 'All'}
        {#each tools as tool}							
            <Card tool={tool} />				
        {/each}
    {:else}    
        {#each tools as tool}        
            {#if Object.keys(tool.niches).includes(nicheFilter)}							
                <Card tool={tool} />				
            {/if}
        {/each}
    {/if}    
</div>