async function sendMessage() {
    const chatBox = document.getElementById("chatBox");
    const userInput = document.getElementById("userInput");
    const userMessage = userInput.Value;

    if (!userMessage) return;

    const userDiv = document.createElement("div");
    userDiv.className = "user-message message";
    userDiv.textContent = userMessage;
    chatBox.appendChild(userDiv);

    userInput.Value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    const endpoint = "";
    const apiKey = "";
    const deploymentId = "";
    const apiVersion = "";


    const url = `${endpoint}/openai/deployments/${deploymentId}/chat/completions?api-version=${apiVersion}`
    const data = {
        message: [{ role: "user", content: userMessage }],
        max_tokens: 50,
    };

    const headers = {
        "Content-Type": "application/json",
        "api-key": apiKey,
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            const botMessage = result.choices[0].message.content;

            const botDiv = document.createElement("div");
            botDiv.className = "bot-message message";
            botDiv.textContent = botMessage;
            chatBox.appendChild(botDiv);

            chatBox.scrollTop = chatBox.scrollHeight;
        } else {
            console.error("Erro na requisição", response.status, response.statusText)

            const botDiv = document.createElement("div");
            botDiv.className = "bot-message message";
            botDiv.textContent = "Erro ao se comunicar com o serviço";
            chatBox.appendChild(botDiv);
        }

    } catch (error) {
        console.error("Erro", error);

        const botDiv = Document.createElement("div");
        botDiv.className = "bot-message message";
        botDiv.textContent = "Erro ao se comunicar com o serviço.";
        chatBox.appendChild(botDiv);

    }

}
