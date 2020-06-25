<script>
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();
const keyCodes = Object.freeze({
    'LEFT': 37,
    'UP': 38,
    'RIGHT': 39,
    'DOWN': 40
});

export let id;
export let checked;
export let label;

function checkSelection(label) {
	dispatch('check', {label});
}

function handleKeyDown(event) {
    switch ( event.keyCode ) {
		case keyCodes.UP:
        case keyCodes.LEFT:
            dispatch('checkPrevious', {label});
            break;
        case keyCodes.DOWN:
        case keyCodes.RIGHT:
            dispatch('checkNext', {label});
            break;
        default:
            break;
    }
}
</script>

<button id="{id}" role="radio" type="button" aria-checked={checked} class="button button--radio button--inverse" on:click={() => checkSelection(label)} on:keydown={(event) => handleKeyDown(event)}>
	{label}
</button>

<style>
button {
    max-width: 100%;
}
</style>
