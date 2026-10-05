<script lang="ts">
	import { chains, type ChainId } from '../chains';

	/** One design choice, from what is needed to what has to be built. */
	let { id }: { id: ChainId } = $props();
	let chain = $derived(chains[id]);
</script>

<div class="chain">
	<div class="link need">
		<span>{chain.from === 'recording' ? 'the recording needs' : 'the question needs'}</span>
		{chain.need}
	</div>
	<div class="link choice"><span>so the design is</span>{chain.choice}</div>
	<div class="link build"><span>which takes</span>{chain.build}</div>
</div>
