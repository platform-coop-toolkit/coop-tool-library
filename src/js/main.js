/* global document */

import Pinecone from '@platform-coop-toolkit/pinecone';
import 'wicg-inert';
import Tools from '../components/Tools.svelte';

const menu = document.querySelector('.menu');
const menuToggle = document.querySelector('.menu-toggle');

if (menu && menuToggle) {
	new Pinecone.Menu(menu, menuToggle);
}

const cards = document.querySelectorAll('.card');

if (cards.length > 0) {
	Array.prototype.forEach.call(cards, card => {
		new Pinecone.Card(card);
	});
}

new Tools({
	target: document.querySelector('#tools')
});
