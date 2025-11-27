// setTimeout(() => {
//     console.log("Going to Shop")
//         setTimeout(() => {
//             console.log("Selecting items");
//             setTimeout(() => {
//                console.log("Billing the goods");
//                 setTimeout(() => {
//                     console.log("Giving MOney");
//                     setTimeout(() => {
//                         console.log("Coming home");
//                         setTimeout(() => {
//                             console.log("Met friend on the Way");
//                             setTimeout(() => {
//                                console.log("Came Home");
//                                 setTimeout(() => {
//                                     console.log("Gave goods to Mom");
//                                     setTimeout(() => {
//                                         console.log("I kept the balance, So Happy!!!");
                                        
//                                     }, 1000);
//                                 }, 2000);
//                             }, 1000);
//                         }, 2000);
//                     }, 3000);
//                 }, 1000);
//             }, 4000);
//         }, 3000);
// }, 5000);

// function sendPromt() { 
//     let txtPromt = document.getElementById("txtPromt").value;
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("X-goog-api-key", "AIzaSyAiD12N8SHvPH52LtW7wLIdE3vTWgXZ4jc");


//     const raw = JSON.stringify({
//     "contents": [
//         {
//         "parts": [
//             {
//             "text": txtPromt
//             }
//         ]
//         }
//     ]
//     });

//     const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow"
//     };

//     fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", requestOptions)
//     .then((response) => response.json())
//     .then((result) => {
//         document.getElementById("lblResult").innerHTML= marked.parse(result.candidates[0].content.parts[0].text);
//         // console.log(result.candidates[0].content.parts[0].text);
//     })
//     .catch((error) => console.error(error));
// }

function sendPrompt() {
    // Get the input value
    let txtPrompt = document.getElementById("txtPrompt").value;
    
    // Show user message in chat
    let userMessageDiv = document.createElement("div");
    userMessageDiv.className = "message user-message";
    userMessageDiv.innerHTML = "<div class='message-content'>" + txtPrompt + "</div>";
    document.getElementById("chat-messages").appendChild(userMessageDiv);
    
    // Clear input
    document.getElementById("txtPrompt").value = "";
    
    // Show loading
    let loadingDiv = document.createElement("div");
    loadingDiv.className = "message bot-message";
    loadingDiv.id = "loadingMessage";
    loadingDiv.innerHTML = "<div class='message-content'>Thinking...</div>";
    document.getElementById("chat-messages").appendChild(loadingDiv);
    
    // Scroll to bottom
    document.getElementById("chat-messages").scrollTop = document.getElementById("chat-messages").scrollHeight;

    // API call
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-goog-api-key", "AIzaSyAiD12N8SHvPH52LtW7wLIdE3vTWgXZ4jc");

    const raw = JSON.stringify({
        "contents": [{
            "parts": [{
                "text": txtPrompt
            }]
        }]
    });

    fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", {
        method: "POST",
        headers: myHeaders,
        body: raw
    })
    .then(response => response.json())
    .then(result => {
        // Remove loading
        document.getElementById("loadingMessage").remove();
        
        // Show bot response
        let botMessageDiv = document.createElement("div");
        botMessageDiv.className = "message bot-message";
        let responseText = result.candidates[0].content.parts[0].text;
        botMessageDiv.innerHTML = "<div class='message-content'>" + marked.parse(responseText) + "</div>";
        document.getElementById("chat-messages").appendChild(botMessageDiv);
        
        // Scroll to bottom
        document.getElementById("chat-messages").scrollTop = document.getElementById("chat-messages").scrollHeight;
    })
    .catch(error => {
        console.error(error);
        // Remove loading and show error
        document.getElementById("loadingMessage").remove();
        
        let errorDiv = document.createElement("div");
        errorDiv.className = "message bot-message";
        errorDiv.innerHTML = "<div class='message-content'>Error: " + error.message + "</div>";
        document.getElementById("chat-messages").appendChild(errorDiv);
    });
}

// Handle Enter key
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendPrompt();
    }
}