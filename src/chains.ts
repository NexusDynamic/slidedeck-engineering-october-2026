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
		choice: 'Assign teams, make sure everyone is aware of their assignment and teammates',
		build: 'Teams can be made out of any participants: networked multiplayer, teams set per trial block'
	},
	signal: {
		from: 'cognitive',
		need: 'Interaction happens in real time, moment to moment',
		choice: 'Neural synchrony from EEG recordings',
		build: 'Hyperscanner platform'
	},
	task: {
		from: 'cognitive',
		need: 'Behaviour closer to everyday life, still repeatable',
		choice: 'A videogame: engaging, real-time, and the same every session',
		build: 'A game engine as the experiment software. No off-the-shelf group experiment tools exist.'
	},
	clean: {
		from: 'recording',
		need: 'Clean EEG signals, minimal artifacts',
		choice: 'No talking, sitting still, two buttons, one for each thumb',
		build: 'EMG on the thumbs and a motion sensor on the chair'
	},
	constant: {
		from: 'cognitive',
		need: 'Synchrony based on group membership',
		choice: 'Same environment and stimulus. Only the teams differ',
		build: 'Coordinator runs the physics and updates all iPads'
	},
	together: {
		from: 'cognitive',
		need: 'Real-time simultaneous cooperation and competition',
		choice: 'Teammates share a paddle and race against the other team',
		build: 'A press has to reach every teammate’s screen fast, latency must be quantified'
	},
	events: {
		from: 'cognitive',
		need: 'Analyse synchrony from all participants at any given moment',
		choice: 'Moments come from play, trials and blocks are bounded',
		build: 'Time and event markers in EEG recordings'
	}
} as const;
