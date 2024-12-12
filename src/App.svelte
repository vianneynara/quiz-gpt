<script lang="ts">
  import ChatPanel from './lib/ChatPanel.svelte';
  import AuthorizeModal from './lib/AuthorizeModal.svelte';
  import NewTopicModal from './lib/NewTopicModal.svelte';
  import SystemPromptModal from './lib/SystemPromptModal.svelte';
  import {onMount} from 'svelte';

  let systemPrompt = 'Welcome to the chat!';
  let showAuthorizeModal = false;
  let showTopicModal = false;
  let showSystemPromptModal = false;
  let topic = localStorage.getItem('topic') || 'Topic not set';

  // Load system prompt and topic from localStorage on mount
  onMount(() => {
    const storedPrompt = localStorage.getItem('systemPrompt');
    if (storedPrompt) {
      systemPrompt = storedPrompt;
    }
    const storedTopic = localStorage.getItem('topic');
    if (storedTopic) {
      topic = storedTopic;
    }
  });

  // Save system prompt to localStorage whenever it changes
  $: localStorage.setItem('systemPrompt', systemPrompt);

  function toggleAuthorizeModal() {
    showAuthorizeModal = !showAuthorizeModal;
  }

  function toggleTopicModal() {
    showTopicModal = !showTopicModal;
  }

  function toggleSystemPromptModal() {
    showSystemPromptModal = !showSystemPromptModal;
  }

  function resetChat() {
    localStorage.removeItem('chatMessages');
    localStorage.setItem('topic', 'Topic not set');
    systemPrompt = 'Welcome to the chat!';
    topic = localStorage.getItem('topic') || 'Topic not set';
  }

  function setTopic(newTopic: string) {
    console.log('New topic:', newTopic);
    localStorage.setItem('topic', newTopic);
    topic = newTopic;
    console.log("Topic: ", topic);
    console.log('New topic set:', localStorage.getItem('topic'));
  }

  function setSystemPrompt(newPrompt: string) {
    systemPrompt = newPrompt;
    console.log('New system prompt set:', localStorage.getItem('systemPrompt'));
  }
</script>

<main class="flex flex-col h-screen w-full">
  <header class="flex items-center justify-between p-4 bg-gray-600 text-white w-full">
    <button on:click={resetChat} class="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
      Reset Chat
    </button>
    <h1 class="text-xl font-semibold">Quiz GPT</h1>
    <div>
      <button
          on:click={toggleTopicModal}
          class="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition mr-2">
        Set Topic
      </button>
      <button
          on:click={toggleSystemPromptModal}
          class="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition mr-2">
        Edit System Prompt
      </button>
      <button
          on:click={toggleAuthorizeModal}
          class="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
        Authorize
      </button>
    </div>
  </header>

  <!-- Chat Panel Section -->
  <div class="flex-1 overflow-y-auto bg-gray-100 p-4 w-full">
    <ChatPanel {topic}/>
  </div>

  <!-- Modal Section -->
  <AuthorizeModal {showAuthorizeModal} onClose={toggleAuthorizeModal}/>
  <NewTopicModal {showTopicModal} onClose={toggleTopicModal} setTopic={setTopic}/>
  <SystemPromptModal {showSystemPromptModal} onClose={toggleSystemPromptModal} setSystemPrompt={setSystemPrompt}/>
</main>