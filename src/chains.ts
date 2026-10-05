/**
 * The thread of the talk: each design choice starts from something the research question (or the
 * recording method) needs, and ends in something that has to be built. One <Chain> per choice on
 * its own slide, and all of them together in the table that closes the design section.
 */
export type ChainId = keyof typeof chains;

export const chains = {
	group: {
		from: 'cognitive',
		need: 'People have to feel that they belong to a group',
		choice: 'Tell them their team and who is on it. That is enough',
		build: 'Any of the six can be teammates: networked multiplayer, teams set per round'
	},
	signal: {
		from: 'cognitive',
		need: 'Interaction happens in real time, moment to moment',
		choice: 'EEG: a direct measure of brain activity, hundreds of samples a second',
		build: 'Six amplifiers recording at once, onto one timeline'
	},
	task: {
		from: 'cognitive',
		need: 'Behaviour close to everyday life, that can still be repeated',
		choice: 'A videogame: engaging, real-time, and the same every session',
		build: 'A game engine as the experiment software. Nothing off the shelf does this for groups'
	},
	clean: {
		from: 'recording',
		need: 'EEG is easily swamped by muscle activity',
		choice: 'No talking, sitting still, two buttons under the thumbs',
		build: 'EMG on the thumbs and a motion sensor on the chair, to check and to clean'
	},
	constant: {
		from: 'cognitive',
		need: 'Synchrony must not come from seeing or doing different things',
		choice: 'One room, one game, nearly identical screens. Only the teams differ',
		build: 'One coordinator runs the physics and sends every iPad the same state'
	},
	together: {
		from: 'cognitive',
		need: 'Cooperation and competition, both at once',
		choice: 'Teammates share one paddle, and race the other team',
		build: 'A press has to reach every teammate’s screen quickly, with a known delay'
	},
	events: {
		from: 'cognitive',
		need: 'Compare six brains at the same moment in the game',
		choice: 'Moments come from play, not from a schedule',
		build: 'Every event marked on all six EEG recordings, to within a millisecond'
	}
} as const;
