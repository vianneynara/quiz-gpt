<script>
  export let message = "default";
  export let role = "user";
  export let key = 0;
</script>

<div class="flex mb-2 justify-between">
  <div class="max-w-sm px-4 py-2 rounded-xl"
       class:ml-auto={role === 'user'}
       class:mr-auto={role !== 'user'}
       class:bg-blue-500={role === 'user'}
       class:bg-gray-200={role !== 'user'}
       class:text-white={role === 'user'}
       class:text-black={role !== 'user'}
       class:role-user={role === 'user'}
       class:role-assistant={role === 'assistant'}
       class:role-system={role === 'system'}>
    {message}
  </div>
</div>

<style>
  :global(.role-user) {
    justify-content: flex-end;
  }
  :global(.role-assistant) {
    justify-content: flex-start;
  }
  :global(.role-system) {
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
  }
  :global(.ml-auto) {
    margin-left: auto;
  }
  :global(.mr-auto) {
    margin-right: auto;
  }
</style>
