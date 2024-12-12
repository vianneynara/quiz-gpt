<script>
  export let message = "default"; // The chat message text
  export let isSent = false; // Set to true for sent messages, false for received
  export let key = 0; // Unique key for each chat bubble
</script>

<div class="flex mb-2" class:is-sent={isSent}>
  <div class="max-w-sm px-4 py-2 rounded-xl"
       class:ml-auto={isSent}
       class:mr-auto={!isSent}
       class:bg-blue-500={isSent}
       class:bg-gray-200={!isSent}
       class:text-white={isSent}
       class:text-black={!isSent}>
    {message}
  </div>
</div>

<style>
  :global(.is-sent) {
    justify-content: flex-end;
  }
  :global(.ml-auto) {
    margin-left: auto;
  }
  :global(.mr-auto) {
    margin-right: auto;
  }
</style>
