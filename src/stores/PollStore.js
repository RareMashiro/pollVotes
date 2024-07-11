import { writable } from "svelte/store";

const PollStore = writable([
    {
        id: 1,
        question: "Elden Ring or Dark Souls?",
        answerA: "Elden Ring",
        answerB: "Dark Souls",
        votesA: 9,
        votesB: 15,
    },
]);

export default PollStore;
