let history = [];
        let currentSessionIndex = null;

        function newChat() {
            const chatBox = document.getElementById('chat-box');
            const topic = document.getElementById('topic').value;
            const difficulty = document.getElementById('difficulty').value;
            const chatHistory = chatBox.innerHTML;

            if (currentSessionIndex !== null) {
                history[currentSessionIndex] = { topic, difficulty, chatHistory };
            } else {
                history.push({ topic, difficulty, chatHistory });
            }

            updateHistory();

            document.getElementById('topic').value = 'Basic Math';
            document.getElementById('difficulty').value = 'Easy';
            chatBox.innerHTML = '';

            currentSessionIndex = history.length;
        }

        function updateHistory() {
            const historyDiv = document.getElementById('history');
            historyDiv.innerHTML = '';
            history.forEach((session, index) => {
                const sessionDiv = document.createElement('div');
                sessionDiv.innerHTML = `
                    <button onclick="loadHistory(${index})">Session ${index + 1}</button>
                `;
                historyDiv.appendChild(sessionDiv);
            });
        }

        function loadHistory(index) {
            const session = history[index];
            document.getElementById('topic').value = session.topic;
            document.getElementById('difficulty').value = session.difficulty;
            document.getElementById('chat-box').innerHTML = session.chatHistory;
            currentSessionIndex = index;
        }

        function checkAnswer(answer) {
            const chatBox = document.getElementById('chat-box');
            const questionDiv = document.getElementById('question');
            let feedback = '';

            fetch('/check_answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question: questionDiv.innerText, answer: answer })
            })
            .then(response => response.json())
            .then(data => {
                feedback = data;

                const feedbackDiv = document.createElement('div');
                feedbackDiv.className = 'message left';
                feedbackDiv.innerText = feedback;
                chatBox.appendChild(feedbackDiv);

                saveCurrentSession();
            });
        }

        function submitPrompt() {
            const prompt = document.getElementById('prompt').value;
            const topic = document.getElementById('topic').value;
            const difficulty = document.getElementById('difficulty').value;
            const chatBox = document.getElementById('chat-box');
            const promptDiv = document.createElement('div');
            promptDiv.className = 'message right';
            promptDiv.innerText = prompt;
            chatBox.appendChild(promptDiv);

            fetch('/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ topic, difficulty, prompt })
            })
            .then(response => response.json())
            .then(data => {
                const responseDiv = document.createElement('div');
                responseDiv.className = 'message left';
                responseDiv.innerHTML = data;
                chatBox.appendChild(responseDiv);

                saveCurrentSession();
            });

            document.getElementById('prompt').value = '';
        }

        function saveCurrentSession() {
            const chatBox = document.getElementById('chat-box');
            const topic = document.getElementById('topic').value;
            const difficulty = document.getElementById('difficulty').value;
            const chatHistory = chatBox.innerHTML;

            if (currentSessionIndex !== null) {
                history[currentSessionIndex] = { topic, difficulty, chatHistory };
            }
        }

        document.getElementById('topic').addEventListener('change', saveCurrentSession);
        document.getElementById('difficulty').addEventListener('change', saveCurrentSession);

        
