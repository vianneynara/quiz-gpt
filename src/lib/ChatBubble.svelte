<script>
  export let message = "default";
  export let role = "user";

  // Split the message by '%%' to separate options only if the role is assistant
  let options = role === 'assistant' ? message.split("%%").map(option => option.trim()) : [];

  // Convert index to letter (A, B, C, D), limit to 4 choices
  const indexToLetter = (index) => {
    const letters = ['A', 'B', 'C', 'D'];
    return letters[index] || ''; // Return empty for indices greater than 3
  };

  // Remove leading letter and period (and parentheses) from options
  const cleanOption = (option) => option.replace(/^[A-D][.)]\s*/, '');
</script>

<div class="flex mb-2 justify-between">
  <div class="max-w-lg px-4 py-2 rounded-xl"
       class:ml-auto={role === 'user'}
       class:mr-auto={role !== 'user'}
       class:bg-blue-500={role === 'user'}
       class:bg-gray-200={role !== 'user'}
       class:text-white={role === 'user'}
       class:text-black={role !== 'user'}
       class:role-user={role === 'user'}
       class:role-assistant={role === 'assistant'}
       class:role-system={role === 'system'}>

    {#if role === 'assistant' && options.length > 1}
      <div class="flex flex-col">
        <!-- Render the first element as the question -->
        <div class="font-bold text-lg mb-2">{options[0]}</div>

        <!-- Render choices with letters (A, B, C, D) -->
        {#each options.slice(1) as option, index}
          <div class="flex items-center bg-blue-500 mb-2 px-2 py-1 rounded-md">
            <span class="font-bold mr-2">{indexToLetter(index)}.</span>
            <span class="text-white">{cleanOption(option)}</span>
          </div>
        {/each}
      </div>
    {:else}
      <span>{message}</span>
    {/if}
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
  .bg-blue-500 {
    background-color: #3b82f6;
  }
  .text-white {
    color: white;
  }
  .font-bold {
    font-weight: bold;
  }
  .rounded-md {
    border-radius: 0.375rem;
  }
  .mb-2 {
    margin-bottom: 0.5rem;
  }
  .px-2 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  .py-1 {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }
</style>
