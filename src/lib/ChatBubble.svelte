<script lang="ts">
  export let message = "default";
  export let role = "user";
  export let onOptionClick; // Function to handle option click

  // Variables to store the parsed question and options
  let question = "";
  let options: String[] = [];
  let codeBlocks: String[] = [];

  // Enhanced parsing logic for assistant messages
  if (role === 'assistant') {
    const codeBlockRegex = /```([\s\S]*?)```/g;
    let match;

    // Extract code blocks
    while ((match = codeBlockRegex.exec(message)) !== null) {
      const code = match[1] || match[2]; // Match either triple or single backtick
      if (code) codeBlocks.push(code.trim());
    }

    const cleanedMessage = message.replace(codeBlockRegex, match => '\n'.repeat(match.split('\n').length - 1)).trim();

    const parts = cleanedMessage.split("%%").map(part => part.trim());
    question = parts[0]; // The first part is the question
    question = question.replace(/\n{2,}/g, '<br><br>').replace(/\n/g, '<br>');

    options = parts.slice(1).map(option => option.trim())
      .filter(option => option !== "" && option !== ".");
  }

  const indexToLetter = (index: number) => {
    const letters = ['A', 'B', 'C', 'D', 'E']; // Extend as needed
    return letters[index] || '';
  };

  const cleanOption = (option: String) => option.replace(/^[A-D][ .)]\s*/, '').trim();

  const handleOptionClick = (index: number) => {
    if (onOptionClick) {
      onOptionClick(options[index]);
    }
  };
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

    {#if role === 'assistant' && question}
      <div class="assistant-reply">
        <!-- Render the question -->
        <p class="question text-md text-gray-800" class:font-semibold={options.length > 0}>
          {@html question}
        </p>


        <!-- Render code blocks if available -->
        {#if codeBlocks.length > 0}
          <div class="code-blocks mt-2 space-y-2">
            {#each codeBlocks as codeBlock}
              <pre class="bg-gray-300 text-blue-900 p-2 rounded text-sm overflow-auto"><code>{codeBlock}</code></pre>
            {/each}
          </div>
        {/if}

        <!-- Render options -->
        <ul class="options space-y-2 mt-2">
          {#each options as option, index}
            {#if option !== "" && option !== "."}
              <li>
                <button
                    on:click={() => handleOptionClick(index)}
                    class="option-btn p-1.5 w-full text-left bg-gray-100 rounded-l hover:bg-blue-200"
                >
                  <strong>{indexToLetter(index)}.</strong> {cleanOption(option)}
                </button>
              </li>
            {/if}
          {/each}
        </ul>
      </div>

    {:else}
      <p class="user-message text-white">{message}</p>
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

  .mb-2 {
    margin-bottom: 0.5rem;
  }
</style>