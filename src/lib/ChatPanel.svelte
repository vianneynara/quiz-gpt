<script lang="ts">
  import MessageInput from './MessageInput.svelte'; // Import the new component
  import ChatBubble from './ChatBubble.svelte';
  import { onMount } from 'svelte';

  interface Message {
    text: string;
    isSent: boolean;
    key: number;
  }

  export let messages: Message[] = [];
  export let topic = 'Starter Chat';
  let newMessage = '';

  // Load messages and topic from localStorage on mount
  onMount(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      messages = JSON.parse(storedMessages);
    }
    const storedTopic = localStorage.getItem('topic');
    if (storedTopic) {
      topic = storedTopic;
    }
  });

  // Save messages to localStorage whenever they change
  $: localStorage.setItem('chatMessages', JSON.stringify(messages));

  function sendMessage() {
    console.log("Click")
    if (newMessage.trim()) {
      // Add new sent message
      const newMsg = { text: newMessage, isSent: true, key: messages.length };
      messages = [...messages, newMsg]; // Add to the messages array

      // Save updated messages to localStorage
      localStorage.setItem('chatMessages', JSON.stringify(messages));
      newMessage = ''; // Clear the input field
    }
  }
</script>

<div class="space-y-4 flex-1 overflow-y-auto bg-gray-100 p-4 w-full">
  <h2 class="text-xl text-blue-700 font-semibold text-center">{topic}</h2>
  {#each messages as { text, isSent }, index}
    <ChatBubble message={text} isSent={isSent} key={index} />
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