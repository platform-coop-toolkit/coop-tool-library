<script>
    export let tools = [];
    export let nicheFilter = 'All';
    export let pricingFilter = 'All';

    import Card from './Card.svelte';

    function hasNiche(tool, nicheFilter) {
        if(nicheFilter === 'All') return true;
        else return Object.keys(tool.niches).includes(nicheFilter);        
    }

    function hasPricing(tool, pricingFilter) {
        if(pricingFilter === 'All') return true;
        else return tool.pricing === pricingFilter;
    }
    
</script>

<div class="cards" >			
    {#each tools as tool}        
        {#if hasNiche(tool, nicheFilter) && hasPricing(tool, pricingFilter)}							
            <Card tool={tool} />				
        {/if}
    {/each} 
</div>