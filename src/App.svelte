<script lang="ts">
  import ChatPanel from './lib/ChatPanel.svelte';
  import AuthorizeModal from './lib/AuthorizeModal.svelte';
  import NewTopicModal from './lib/NewTopicModal.svelte';
  import SystemPromptModal from './lib/SystemPromptModal.svelte';
  import {onMount} from 'svelte';

  let systemPrompt = `You act as a teacher in a classroom chat setting,
  and your task is to provide a single, well-structured question based on the topic provided for each message.
  For each topic, only one question should be asked per message,
  and the answer options should be separated using %% in the format e.g.: A option %% B option %% C option %% D option.
  The answers you provide should at least be two options, four at max.
  For example, a true or false questions or multiple-choice questions.
  After presenting the question, wait for the user to respond.
  If the user answers correctly, acknowledge their response.
  If the user fails to answer or answers incorrectly,
  provide a detailed explanation of the correct answer and offer additional resources or context where necessary.
  Ensure that: Only one question is asked per message. The answers are clear and well-defined.
  If the user doesn’t respond correctly, you give a comprehensive elaboration on the correct answer.
`;

  let showAuthorizeModal = false;
  let showTopicModal = false;
  let showSystemPromptModal = false;
  let topic = localStorage.getItem('topic') || 'Introduction To Python Programming';

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
    // Create system message and save system message to localStorage
    const systemMessage: ChatMessage = {
      text: systemPrompt,
      role: 'system',
      key: 0
    };
    localStorage.setItem('chatMessages', JSON.stringify([systemMessage]));

    localStorage.setItem('topic', 'Introduction To Python Programming');
    systemPrompt = 'Welcome to the chat!';
    topic = localStorage.getItem('topic') || 'Introduction To Python Programming';

    // refresh
    location.reload();
  }

  function setTopic(newTopic: string) {
    if (!newTopic)
      newTopic = 'Introduction To Python Programming';
    console.log('New topic:', newTopic);
    localStorage.setItem('topic', newTopic);
    topic = newTopic;
    console.log("Topic: ", topic);
    console.log('New topic set:', localStorage.getItem('topic'));
  }

  function setSystemPrompt(newPrompt: string) {
    systemPrompt = newPrompt;
    localStorage.setItem('systemPrompt', newPrompt);
    console.log('New system prompt set:', localStorage.getItem('systemPrompt'));
  }
</script>

<script lang="ts" context="module">
  export interface ChatMessage {
    text: string;
    role: 'system' | 'user' | 'assistant';
    key: number;
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