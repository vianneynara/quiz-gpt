<script lang="ts">
  export let showTopicModal: boolean;
  export let onClose: () => void;
  export let setTopic: (newTopic: string) => void;

  let newTopic = "";

  function handleSetTopic() {
    setTopic(newTopic);
    onClose();
  }
</script>

{#if showTopicModal}
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-4 rounded-md shadow-md w-1/2">
      <h2 class="text-xl text-black font-semibold mb-4">Set Chat Topic</h2>
      <input
          type="text"
          placeholder="Enter the topic"
          bind:value={newTopic}
            on:keydown={(e) => (e.key === 'Enter') ? handleSetTopic() : (e.key === 'Escape') && onClose()}
          class="bg-gray-300 text-black w-full p-2 border rounded mb-4 focus:ring-2 focus:ring-blue-500"
      />
      <div class="flex justify-end">
        <button on:click={onClose} class="p-2 bg-gray-500 text-white rounded-md mr-2">Cancel</button>
        <button
            on:click={handleSetTopic}
            class="p-2 bg-blue-500 text-white rounded-md"
            on:keydown={(event) => event.key === 'Enter' && handleSetTopic()}>
          Set Topic
        </button>
      </div>
    </div>
  </div>
{/if}