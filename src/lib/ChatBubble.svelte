<script>
  export let message = "default";
  export let sender = "user";
  export let key = 0;
</script>

<div class="flex mb-2" class:sender-user={sender === 'user'} class:sender-assistant={sender === 'assistant'} class:sender-system={sender === 'system'}>
  <div class="max-w-sm px-4 py-2 rounded-xl"
       class:ml-auto={sender === 'user'}
       class:mr-auto={sender !== 'user'}
       class:bg-blue-500={sender === 'user'}
       class:bg-gray-200={sender !== 'user'}
       class:text-white={sender === 'user'}
       class:text-black={sender !== 'user'}>
    {message}
  </div>
</div>

<style>
  :global(.sender-user) {
    justify-content: flex-end;
  }
  :global(.sender-assistant) {
    justify-content: flex-start;
  }
  :global(.sender-system) {
    justify-content: center;
  }
  :global(.ml-auto) {
    margin-left: auto;
  }
  :global(.mr-auto) {
    margin-right: auto;
  }
</style>