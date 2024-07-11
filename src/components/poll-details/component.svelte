<!-- svelte-ignore a11y-click-events-have-key-events -->
<script>
    import PollStore from '../../stores/PollStore';
    // import { createEventDispatcher } from 'svelte';
    import Card from '../Shared/card/component.svelte';
    import Button from '../Shared/button/component.svelte';
    import { tweened } from 'svelte/motion';

    export let poll;
    // const dispatch = createEventDispatcher();
    
    // reactive value
    $: totalVotes = poll.votesA + poll.votesB;
    // При создании нового голосования эти значения равны NaN, т.к. делим на 0,
    // поэтому добавляем || 0
    $: percentA = Math.floor(100 / totalVotes * poll.votesA) || 0; 
    $: percentB = Math.floor(100 / totalVotes * poll.votesB) || 0;

    // tweened percentages
    const tweenedA = tweened(0);
    const tweenedB = tweened(0);
    $: tweenedA.set(percentA);
    $: tweenedB.set(percentB);
    // $: console.log($tweenedA, $tweenedB);

    // handling vote
    const handleVote = (option, id) => {
        // dispatch('vote', {option: option, id: id})
        // dispatch('vote', {option, id});

        PollStore.update(currentData => {
            let copiedPolls = [...currentData];
            let upvotedPoll = copiedPolls.find(item => item.id == id);
            
            if(option === 'a') {
                upvotedPoll.votesA++;
            }
            if(option === 'b') {
                upvotedPoll.votesB++;
            }
    
            return copiedPolls;
        })

    }

    // Deleting a poll
    const handleDelete = (id) => {
        PollStore.update(currentPolls => {
            return currentPolls.filter(poll => poll.id !== id);
        })
    }
</script>

<Card>
    <div class="poll">
        <h3>{poll.question}</h3>
        <p>Total votes: {totalVotes}</p>
        <div class="answer" on:click={() => handleVote('a', poll.id)}>
            <!-- percentA заменили на $tweenedA -->
            <div class="percent percent-a" style="width: {$tweenedA}%"></div>
            <span>{poll.answerA} ({poll.votesA})</span>
        </div>
        <div class="answer" on:click={() => handleVote('b', poll.id)}>
            <!-- percentB заменили на $tweenedB -->
            <div class="percent percent-b" style="width: {$tweenedB}%"></div>
            <span>{poll.answerB} ({poll.votesB})</span>
        </div>
    </div>
    <div class="delete">
        <Button flat={true} on:click={() => handleDelete(poll.id)}>Delete</Button>
    </div>
</Card>

<style>
    div > h3 {
        margin: 0 auto;
    }
    div > p {
        margin-top: 0.4em;
        margin-bottom: 2em;
    }
    div > .answer {
        margin: 0.6em auto;
    }
    h3 {
        color: #555;
    }
    p {
        font-size: 0.8em;
        color: #aaa;
    }
    .answer {
        background-color: #fafafa;
        cursor: pointer;
        position: relative;
    }
    .answer:hover {
        opacity: 0.6;
    }
    span {
        display: inline-block;
        padding: 0.6em 1.25em;
    }
    .percent {
        height: 100%;
        position: absolute;
        box-sizing: border-box;
    }
    .percent-a {
        border-left: 4px solid rgb(217, 27, 66);
        background-color: rgba(217, 27, 66, 0.2);
    }
    .percent-b {
        border-left: 4px solid rgb(69, 196, 150);
        background-color: rgba(69, 196, 150, 0.2);
    }
    .delete {
        margin-top: 2em;
        text-align: center;
    }
</style>