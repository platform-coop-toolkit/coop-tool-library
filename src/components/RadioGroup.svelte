<script>
import slugify from 'slugify';

export let options;
export let activeOption;

const handleCheck = value => {
	activeOption = value;
};

const handleCheckPrevious = value => {
	const currentIndex = options.indexOf(value);
	const newIndex = (currentIndex === 0) ? options.length - 1 : currentIndex - 1;
	const newButton = document.getElementById(slugify(options[newIndex], {lower: true}));
	newButton.focus();
	activeOption = options[newIndex];
};

const handleCheckNext = value => {
	const currentIndex = options.indexOf(value);
	const newIndex = (currentIndex === options.length - 1) ? 0 : currentIndex + 1;
	const newButton = document.getElementById(slugify(options[newIndex], {lower: true}));
	newButton.focus();
	activeOption = options[newIndex];
}

import RadioGroupButton from './RadioGroupButton.svelte';
</script>

<div class="radio-group">
	{#each options as option}
	<RadioGroupButton id={slugify(option, {lower: true})} checked={activeOption === option ? 'true' : 'false'} label={option} on:check={(event) => handleCheck(event.detail.label)} on:checkPrevious={(event) => handleCheckPrevious(event.detail.label)} on:checkNext={(event) => handleCheckNext(event.detail.label)} />
	{/each}
</div>
