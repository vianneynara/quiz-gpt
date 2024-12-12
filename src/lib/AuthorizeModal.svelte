<script lang="ts">
  export let showAuthorizeModal: boolean;
  export let onClose: () => void;

  let apiKey = '';
  let showApiKey = false;

  import {onMount} from 'svelte';

  onMount(() => {
    showApiKey = false;
    const storedApiKey = localStorage.getItem('apiKey');
    if (storedApiKey) {
      apiKey = storedApiKey;
    }
  });

  function saveApiKey() {
    localStorage.setItem('apiKey', apiKey);
    console.log('API Key saved:', localStorage.getItem('apiKey'));
    handleClose();
  }

  function toggleShowApiKey() {
    showApiKey = !showApiKey;
  }

  function handleClose() {
    showApiKey = false;
    onClose();
  }
</script>

{#if showAuthorizeModal}
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-4 rounded-md shadow-md w-1/2">
      <h2 class="text-xl text-black font-semibold mb-4">Authorize with API Key</h2>
      <div class="flex items-center mb-4">
        <input
            type={showApiKey ? 'text' : 'password'}
            placeholder="Enter API Key"
            bind:value={apiKey}
            on:keydown={(e) => (e.key === 'Enter') ? saveApiKey() : (e.key === 'Escape') && handleClose()}
            class="bg-gray-300 text-black w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
        <button on:click={toggleShowApiKey} class="ml-2 p-2 bg-white text-gray-600 rounded-md">
          {#if showApiKey}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"/>
            </svg>
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
            </svg>
          {/if}
        </button>
      </div>
      <div class="flex justify-end">
        <button on:click={handleClose} class="p-2 bg-gray-500 text-white rounded-md mr-2">Cancel</button>
        <button
            on:click={saveApiKey}
            class="p-2 bg-blue-500 text-white rounded-md">
          Set API Key
        </button>
      </div>
    </div>
  </div>
{/if}