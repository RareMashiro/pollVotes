<script>
    // import { onDestroy, onMount } from 'svelte';
    import { fade, slide, scale } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import PollStore from '../../stores/PollStore';
    import PollDetails from '../poll-details/component.svelte';
    
    // export let polls = [];

    // Подписка и отписка на Store теперь работает 
    // через $PollStore в цикле {#each} - альтернатива
    // const unsub = PollStore.subscribe(data => {
    //     polls = data;
    // })

    // onDestroy(() => {
    //     console.log('Destroyed');
    //     unsub();
    // })

</script>

<div class="poll-list">
    {#each $PollStore as poll (poll.id)}
        <div in:fade out:scale|local animate:flip={{duration: 500}}>
            <!-- <PollDetails {poll} on:vote/> -->
            <PollDetails {poll} />
        </div>
    {/each}
</div>

<style>
    .poll-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }
</style>