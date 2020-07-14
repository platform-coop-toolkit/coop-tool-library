import * as sapper from '@sapper/app';

import Pinecone from '@platform-coop-toolkit/pinecone';

sapper.start({
	target: document.querySelector('body')
});

const cards = document.querySelectorAll( '.card' );

if ( cards ) {
	Array.prototype.forEach.call( cards, card => {
		new Pinecone.Card( card );
	} );
}
