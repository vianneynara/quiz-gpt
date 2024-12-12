<script lang="ts">
  import MessageInput from './MessageInput.svelte';
  import ChatBubble from './ChatBubble.svelte';
  import { onMount } from 'svelte';
  import type { ChatMessage } from '../App.svelte';
  import axios from 'axios';

  export let messages: ChatMessage[] = [];
  export let topic: string;

  const apiUrl = `https://api.openai.com/v1/chat/completions`;
  let newMessage = '';

  onMount(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      messages = JSON.parse(storedMessages);
    }
  });

  async function sendToOpenAI() {
    const apiKey = localStorage.getItem('apiKey');
    if (!apiKey) {
      console.error('API key is missing');
      return;
    }

    if (newMessage.trim()) {
      try {
        const conversationHistory = messages.map((msg) => ({
          role: msg.role,
          content: msg.text
        }));

        conversationHistory.push({
          role: 'user',
          content: newMessage
        });

        const conversationHistoryWithTopic = conversationHistory.map((msg, index) => {
          if (index === conversationHistory.length - 1) {
            return {
              role: msg.role,
              content: `The topic of this conversation is: ${localStorage.getItem('topic')}${msg.content}`
            }
          }
          return msg;
        });

        const response = await axios.post(apiUrl, {
          model: 'gpt-3.5-turbo',
          messages: conversationHistoryWithTopic,
        }, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        });

        const assistantReply: string = response.data.choices[0].message.content;
        console.log('Assistant reply:', assistantReply);
        const assistantMessage: ChatMessage = {
          text: assistantReply,
          role: 'assistant',
          key: messages.length + 1
        };

        messages = [
          ...messages,
          { text: newMessage, role: 'user', key: messages.length },
          assistantMessage
        ];

        localStorage.setItem('chatMessages', JSON.stringify(messages));
        newMessage = '';
      } catch (error) {
        console.error('Error sending message to OpenAI:', error);
      }
    }
  }

  function handleSend() {
    sendToOpenAI();
    setTimeout(() => {
      const chatContainer = document.querySelector('.space-y-4');
      if (chatContainer) {
        chatContainer.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }, 1500);
  }

  function startQuiz() {
    newMessage = 'Start Quiz';
    handleSend();
  }

  function handleOptionClick(option) {
    newMessage = option;
    handleSend();
  }
</script>

<div class="space-y-4 flex-1 overflow-y-auto bg-gray-100 p-4 w-full pb-20">
  <h2 class="text-xl text-blue-700 font-semibold text-center">{topic}</h2>
  {#each messages.slice(1) as { text, role }, index}
    <ChatBubble message={text} role={role} onOptionClick={handleOptionClick} />
  {/each}
  {#if messages.length === 1}
    <div class="flex justify-center">
      <button on:click={startQuiz} class="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
        Start Quiz
      </button>
    </div>
  {/if}
</div>

<MessageInput bind:newMessage={newMessage} sendMessage={handleSend} />

<style>
  :global(body) {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    width: 100%;
  }
</style>