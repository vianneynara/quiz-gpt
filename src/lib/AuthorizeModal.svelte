<script lang="ts">
  export let showAuthorizeModal: boolean;
  export let onClose: () => void;

  let apiKey = '';

  import {onMount} from 'svelte';

  onMount(() => {
    const storedApiKey = localStorage.getItem('apiKey');
    if (storedApiKey) {
      apiKey = storedApiKey;
    }
  });

  function saveApiKey() {
    localStorage.setItem('apiKey', apiKey);
    console.log('API Key saved:', localStorage.getItem('apiKey'));
    onClose();
  }
</script>

{#if showAuthorizeModal}
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-4 rounded-md shadow-md w-1/2">
      <h2 class="text-xl text-black font-semibold mb-4">Authorize with API Key</h2>
      <input
          type="text"
          placeholder="Enter API Key"
          bind:value={apiKey}
          class="bg-gray-300 text-black w-full p-2 border rounded mb-4 focus:ring-2 focus:ring-blue-500 bg-gray-300 text-black"
      />
      <div class="flex justify-end">
        <button on:click={onClose} class="p-2 bg-gray-500 text-white rounded-md mr-2">Cancel</button>
        <button
            on:click={saveApiKey}
            class="p-2 bg-blue-500 text-white rounded-md"
            on:keydown={(event) => event.key === 'Enter' && saveApiKey()}>
          Set API Key</button>
      </div>
    </div>
  </div>
{/if}