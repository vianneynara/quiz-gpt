<script lang="ts">
  export let newMessage: string;
  export let sendMessage: () => void; // Ensure sendMessage is received properly
</script>

<footer class="fixed bottom-0 left-0 w-full p-4 bg-gray-600">
  <div class="flex items-center">
    <input
      type="text"
      placeholder="Type your message..."
      bind:value={newMessage}
      class="flex-1 p-2 me-2 rounded-md border-none focus:ring-2 focus:ring-blue-500 bg-gray-200 text-black"
    />
    <button
      on:click={sendMessage}
      class="p-2 rounded-md bg-blue-500 text-white -ml-px hover:bg-blue-600 transition">
      Send
    </button>
  </div>
</footer>

<style>
  /* You can add styles here if necessary */
</style>
