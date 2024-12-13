<script lang="ts">
  export let newMessage: string;
  export let sendMessage: () => void;

  function nextQuestion() {
    newMessage = 'Next Question';
    sendMessage();
  }
</script>

<footer class="fixed bottom-0 left-0 w-full p-4 bg-gray-600">
  <div class="flex items-center">
    <button on:click={nextQuestion} class="p-2 me-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">
      Next Question
    </button>
    <input
        type="text"
        placeholder="Type your message..."
        bind:value={newMessage}
        class="flex-1 p-2 me-2 rounded-md border-none focus:ring-2 focus:ring-blue-500 bg-gray-200 text-black"
        on:keydown={(event) => event.key === 'Enter' && sendMessage()}
    />
    <button
        on:click={sendMessage}
        class="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition">
      Send
    </button>
  </div>
</footer>

<style>
</style>
