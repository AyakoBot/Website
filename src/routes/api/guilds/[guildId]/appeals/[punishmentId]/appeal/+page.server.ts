import type { Actions } from './$types';

export const actions = {
	appeal: async (event) => {
		console.log(event);
	},
} satisfies Actions;
