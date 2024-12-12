<script lang="ts">
  export let showTopicModal: boolean;
  export let onClose: () => void;
  export let setTopic: (topic: string) => void;

  let newTopic = '';

  import {onMount} from 'svelte';

  onMount(() => {
    const storedTopic = localStorage.getItem('topic');
    if (storedTopic) {
      newTopic = storedTopic;
    }
  });

  function handleSetTopic() {
    setTopic(newTopic);
    onClose();
  }
</script>

{#if showTopicModal}
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-4 rounded-md shadow-md w-1/2">
      <h2 class="text-xl text-black font-semibold mb-4">Set New Topic</h2>
      <input
          type="text"
          placeholder="Enter new topic"
          bind:value={newTopic}
          class="bg-gray-300 text-black p-2 border rounded-md w-full mb-4"
      />
      <div class="flex justify-end">
        <button on:click={onClose} class="p-2 bg-gray-500 text-white rounded-md mr-2">Cancel</button>
        <button on:click={handleSetTopic} class="p-2 bg-blue-500 text-white rounded-md">Set Topic</button>
      </div>
    </div>
  </div>
{/if}