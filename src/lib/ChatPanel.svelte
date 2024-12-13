<script lang="ts">
  import MessageInput from './MessageInput.svelte';
  import ChatBubble from './ChatBubble.svelte';
  import {onMount} from 'svelte';
  import type {ChatMessage} from '../App.svelte';
  import axios from 'axios';

  export let messages: ChatMessage[] = [];
  export let topic: string;

  const apiUrl = `https://api.openai.com/v1/chat/completions`;
  let newMessage = '';
  let selectedModel = 'gpt-3.5-turbo';

  const models = {
    'gpt-4o': 'GPT-4o: (128,000 | 16,384) tokens',
    'gpt-4o-mini': 'GPT-4o Mini: (128,000 | 16,384) tokens',
    'gpt-4-turbo': 'GPT-4 Turbo: (128,000 | 4,096) tokens',
    'gpt-4': 'GPT-4: (8,192 | 8,192) tokens',
    'gpt-3.5-turbo': 'GPT-3.5 Turbo: (16,385 | 4,096) tokens'
  };

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
        const conversationHistory = [
          ...messages.map((msg) => ({
            role: msg.role,
            content: msg.text
          })),
          {
            role: 'user',
            content: `The topic of this conversation is:
            ${localStorage.getItem('topic')}
            ${newMessage}`
          }
        ];
        console.log("Latest message sent: ", conversationHistory[conversationHistory.length - 1]);

        const response = await axios.post(apiUrl, {
          model: selectedModel,
          messages: conversationHistory,
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
          {text: newMessage, role: 'user', key: messages.length},
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
        chatContainer.scrollIntoView({behavior: 'smooth', block: 'end'});
      }
    }, 1500);
  }

  function startQuiz() {
    newMessage = 'Start Quiz';
    handleSend();
  }

  function handleOptionClick(option: string) {
    newMessage = option;
    handleSend();
  }
</script>

<div class="space-y-4 flex-1 overflow-y-auto bg-gray-100 p-4 w-full pb-20">
  <div class="flex justify-between items-center mb-4">
    <div class="justify-start">
      <select id="model-select" bind:value={selectedModel} class="p-2 border rounded-md">
        {#each Object.entries(models) as [key, value]}
          <option value={key}>{value}</option>
        {/each}
      </select>
    </div>
    <h2 class="text-xl text-blue-700 font-semibold">{topic}</h2>
  </div>
  {#each messages.slice(1) as {text: message, role}, index}
    <ChatBubble {message} {role} onOptionClick={handleOptionClick}/>
  {/each}
  {#if messages.length === 1}
    <div class="flex justify-center">
      <button on:click={startQuiz} class="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
        Start Quiz
      </button>
    </div>
  {/if}
</div>

<MessageInput bind:newMessage={newMessage} sendMessage={handleSend}/>

<style>
  :global(body) {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    width: 100%;
  }
</style>