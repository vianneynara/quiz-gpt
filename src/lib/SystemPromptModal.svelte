<script lang="ts">
  export let showSystemPromptModal: boolean;
  export let onClose: () => void;
  export let setSystemPrompt: (prompt: string) => void;

  let newSystemPrompt = '';

  import { onMount } from 'svelte';

  onMount(() => {
    const storedPrompt = localStorage.getItem('systemPrompt');
    if (storedPrompt) {
      newSystemPrompt = storedPrompt;
    }
  });

  function handleSetSystemPrompt() {
    setSystemPrompt(newSystemPrompt);
    onClose();
  }
</script>

{#if showSystemPromptModal}
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-4 rounded-md shadow-md w-1/2">
      <h2 class="text-black text-xl font-semibold mb-4">Edit System Prompt</h2>
      <textarea
        placeholder="Enter new system prompt"
        bind:value={newSystemPrompt}
        class="bg-gray-300 text-black p-2 border rounded-md w-full mb-4"
      ></textarea>
      <div class="flex justify-end">
        <button on:click={onClose} class="p-2 bg-gray-500 text-white rounded-md mr-2">Cancel</button>
        <button
            on:click={handleSetSystemPrompt}
            class="p-2 bg-blue-500 text-white rounded-md"
            on:keydown={(event) => event.key === 'Enter' && handleSetSystemPrompt()}
        >
          Set Prompt
        </button>
      </div>
    </div>
  </div>
{/if}