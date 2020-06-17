<script>
    export let tools = [];

    import Card from './Card.svelte';

</script>

<div class="cards">				
    {#each tools as tool}							
        <Card tool={tool} />				
    {/each}
</div>