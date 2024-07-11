<script>
    import PollStore from '../../stores/PollStore';
    import { createEventDispatcher } from 'svelte';
    import Button from '../Shared/button/component.svelte';

    let dispatch = createEventDispatcher();
    let fields = {
        question: '',
        answerA: '',
        answerB: ''
    };
    let errors = {
        question: '',
        answerA: '',
        answerB: ''
    }
    let valid = false;

    const submitHandler = () => {
        valid = true;

        if(fields.question.trim().length < 5) {
            valid = false;
            errors.question = 'Question must be at least 5 characters long';
        } else {
            errors.question = '';
        }

        if(fields.answerA.trim().length < 1) {
            valid = false;
            errors.answerA = 'Question must be at least 1 characters long';
        } else {
            errors.answerA = '';
        }

        if(fields.answerB.trim().length < 1) {
            valid = false;
            errors.answerB = 'Question must be at least 1 characters long';
        } else {
            errors.answerB = '';
        }

        // add new poll

        if(valid) {
            let poll = {...fields, votesA: 0, votesB: 0, id: Math.random()};
            // save poll to store
            PollStore.update(currData => {
                return [poll, ...currData];
            });
            // dispatch('add', poll);
            dispatch('add');
        }
    }
</script>

<form on:submit|preventDefault={submitHandler}>
    <div class="form-field">
        <label for="question">Poll Question</label>
        <input type="text" id="question" bind:value={fields.question}>
        <div class="error">{errors.question}</div>
    </div>
    <div class="form-field">
        <label for="answer-a">Answer A</label>
        <input type="text" id="answer-a" bind:value={fields.answerA}>
        <div class="error">{errors.answerA}</div>
    </div>
    <div class="form-field">
        <label for="answer-b">Answer B</label>
        <input type="text" id="answer-b" bind:value={fields.answerB}>
        <div class="error">{errors.answerB}</div>
    </div>
    <!-- <button>Add Poll</button> -->
     <Button type="secondary" flat={true} inverse={false}>Add Poll</Button>
</form>

<style>
    form {
        width: 25em;
        margin: 0 auto;
        text-align: center;
    }
    form > div {
        margin: 1em auto;
    }
    .form-field > label {
        margin: 0.8em auto;
        text-align: left;
    }
    input {
        width: 100%;
        border-radius: 0.3em;
    }
    .error {
        font-weight: bold;
        font-size: 0.8em;
        color: #d91b42;
        text-align: left;
    }
</style>