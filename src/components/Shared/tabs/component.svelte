<!-- svelte-ignore a11y-click-events-have-key-events -->
<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let items;
    export let activeItem;


</script>

<div class="tabs">
    <ul>
        {#each items as item}
            <li on:click={() => dispatch('tabChange', item)}>
                <div class:active={item === activeItem}>{item}</div>
            </li>
        {/each}
    </ul>
</div>

<style>
    .tabs {
        margin-bottom: 2.5em;
    }
    ul {
        display: flex;
        justify-content: center;
        padding: 0;
        list-style-type: none;
    }
    ul > * + * {
        margin: 0 1rem;
    }
    li {
        font-size: 18px;
        color: #555;
        cursor: pointer;
    }
    .active {
        color: #d91b42;
        border-bottom: 0.125em solid #d91b42;
        padding-bottom: 0.5em;
        /* transition: color 1s, border-bottom-color 1s; */
    }
</style>