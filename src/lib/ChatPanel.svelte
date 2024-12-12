<script lang="ts">
  import MessageInput from './MessageInput.svelte';
  import ChatBubble from './ChatBubble.svelte';
  import { onMount } from 'svelte';

  interface Message {
    text: string;
    sender: 'system' | 'user' | 'assistant';
    key: number;
  }

  export let messages: Message[] = [];
  export let topic: string;
  let newMessage = '';

  onMount(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      messages = JSON.parse(storedMessages);
    }
  });

  function sendMessage() {
    if (newMessage.trim()) {
      const newMsg: Message = { text: newMessage, sender: 'user', key: messages.length };
      messages = [...messages, newMsg];
      localStorage.setItem('chatMessages', JSON.stringify(messages));
      newMessage = '';
    }
  }
</script>

<div class="space-y-4 flex-1 overflow-y-auto bg-gray-100 p-4 w-full">
  <h2 class="text-xl text-blue-700 font-semibold text-center">{topic}</h2>
  {#each messages as { text, sender }, index}
    <ChatBubble message={text} sender={sender} key={index} />
  {/each}
</div>

<MessageInput bind:newMessage={newMessage} sendMessage={sendMessage} />

<style>
  :global(body) {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    width: 100%;
  }
</style>