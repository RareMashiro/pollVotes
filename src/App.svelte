<script>
	import NewPollForm from './components/poll-form/component.svelte';
	import Tabs from './components/Shared/tabs/component.svelte';
	import Header from './components/header/component.svelte';
	import Footer from './components/footer/component.svelte';
	import PollList from './components/poll-list/component.svelte';

	// tabs
	let items = ['Current Polls', 'Add New Poll'];
	let activeItem = items[0];

	const tabChange = (evt) => {
		activeItem = evt.detail;
	}

	// Эти данные перенесены в PollStore
	// let polls = [
	// 	{
	// 		id: 1,
	// 		question: 'Elden Ring or Dark Souls?',
	// 		answerA: 'Elden Ring',
	// 		answerB: 'Dark Souls',
	// 		votesA: 9,
	// 		votesB: 15,
	// 	},
	// ]

	const handleAdd = (evt) => {
		// const poll = evt.detail;
		// polls = [poll, ...polls];
		// console.log(polls);
		activeItem = 'Current Polls'
	}

	// const handleVote = (evt) => {
	// 	const {id, option} = evt.detail;
	// 	let copiedPolls = [...polls];
	// 	let upvotedPoll = copiedPolls.find(item => item.id == id);
	// 	if(option === 'a') {
	// 		upvotedPoll.votesA++;
	// 	}
	// 	if(option === 'b') {
	// 		upvotedPoll.votesB++;
	// 	}

	// 	polls = copiedPolls;
	// }

</script>

<Header />
<main>
	<Tabs {activeItem} {items} on:tabChange={tabChange}/>
	{#if activeItem === 'Current Polls'}
		<!-- {#if polls.length === 0}
			<p>There is no polls here...</p>
		{:else}
			<PollList {polls} on:vote={handleVote}/>
		{/if} -->
		<!-- <PollList on:vote={handleVote}/> -->
		<PollList />
	{:else if activeItem === 'Add New Poll'}
		<NewPollForm on:add={handleAdd}/>
	{/if}
</main>
<Footer />

<style>
	main {
		max-width: 70%;
		margin: 2.5em auto;
		min-height: 60vh;
	}

</style>