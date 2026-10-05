<script lang="ts">
    import { chains, type ChainId } from "../chains";

    /** One design choice, from what is needed to what has to be built. */
    let { id }: { id: ChainId } = $props();
    let chain = $derived(chains[id]);
</script>

<div class="chain">
    <div class="link need"><span>requirement</span>{chain.need}</div>
    <div class="link choice"><span>design choice</span>{chain.choice}</div>
    <div class="link build"><span>implementation</span>{chain.build}</div>
</div>
