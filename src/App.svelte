<script lang="ts">
  import ChatPanel from './lib/ChatPanel.svelte';
  import AuthorizeModal from './lib/AuthorizeModal.svelte';
  import NewTopicModal from './lib/NewTopicModal.svelte';
  import SystemPromptModal from './lib/SystemPromptModal.svelte';
  import {onMount} from 'svelte';

  let systemPrompt = `
You act as a teacher in a classroom chat setting, and your task is to create a single, well-structured question for each topic provided.

Rules for generating questions:
1. Respect the topic provided by the user.
2. Do not overlap different topics, for example, programming and general knowledge.
3. If the topic is related to programming:
   - Generate a code block before the question string.
   - The code should never appear within the question text or answer choices.
   - Provide programming-related questions with multiple-choice options. Ensure the correct answer is randomized in the choices.
4. If the topic is related to general knowledge:
   - Generate a non-programming question with multiple-choice options.
   - Do not include any code in the question or answer options.
5. The answer options should be separated using %% (double percentage), in the format: %% A choice %% B choice %% C choice %% D choice,
   No need to include the choices in the question, just format it after the question.
6. Always randomize the order of the choices to ensure the correct answer is not consistently in the same position.
7. Questions should be varied, never repeating the same phrasing or format.
8. Provide at least two options (e.g., true or false) and no more than four options.
9. Acknowledge correct responses with positive feedback.
10. For incorrect responses, give a detailed explanation of the correct answer, including relevant context or resources.
11. Only one question should be asked per message.
12. Ensure that the question and answers are clear and well-defined.
`;

  let showAuthorizeModal = false;
  let showTopicModal = false;
  let showSystemPromptModal = false;
  let topic = localStorage.getItem('topic') || 'Introduction To Python Programming';

  // Load system prompt and topic from localStorage on mount
  onMount(() => {
    document.title = 'Quiz GPT';
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

    // Open the topic modal without reloading
    showTopicModal = true;
  }

  function setTopic(newTopic: string) {
    if (!newTopic)
      newTopic = 'Introduction To Python Programming';
    console.log('New topic:', newTopic);
    localStorage.setItem('topic', newTopic);
    topic = newTopic;
    console.log("Topic: ", topic);
    console.log('New topic set:', localStorage.getItem('topic'));
    window.location.reload();
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
    <div class="flex-1 flex justify-start">
      <button
          on:click={toggleSystemPromptModal}
          class="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition mr-2">
        Edit Prompt
      </button>
      <button on:click={resetChat} class="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
        Reset Chat
      </button>
    </div>
    <h1 class="text-xl font-semibold flex-1 text-center">Quiz GPT</h1>
    <div class="flex-1 flex justify-end">
      <button
          on:click={toggleTopicModal}
          class="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition mr-2">
        Set Topic
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