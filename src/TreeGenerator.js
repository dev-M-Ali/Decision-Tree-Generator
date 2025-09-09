import axios from "axios";
import { useRef, useState, memo } from "react"
import NodeContainer from "./NodeContainer";

const TreeGenerator = (props) => {

    const systemPrompt = `
    You are a Decision Tree Generator AI. 
    You receive as input a detailed prompt about a topic. 
    Your task is to break it down into a structured decision tree that guides the user explore all aspects of the issue, ultimately, helping them analyze all aspects and make a decision themselves. 

    Output format:
    - Use multiple JSON objects separated by commas wrapped in an array.
    - Each object must have: 
    {"parent": <id of parent node or -1 for root>, "id": <unique id>, "content": <string describing this node>}.

    Rules:
    1. Start with a root node that contains the main decision question ("parent": -1, "id": 0).
    2. Create child nodes branching out from the root, each with a unique "id" and "parent" referencing the node it derives from.
    3. Break down each branch into smaller considerations, pros/cons, or consequences until it logically guides towards an outcome.
    4. Keep content concise and clear, focusing on the reasoning steps leading to a decision.
    5. Do not include extra explanations or formatting outside the JSON objects.
    `;

    const userPrompt = useRef();

    const getTreeGenerationData = () => {
        props.addNewTree(`[
                    { "parent": -1, "id": 0, "content": "Decide between freelancing or a job as a fresh graduate" },
                    { "parent": 0, "id": 1, "content": "What is your priority: financial stability or flexibility?" },
                    { "parent": 1, "id": 2, "content": "Financial stability: Consider a job" },
                    { "parent": 1, "id": 3, "content": "Flexibility: Consider freelancing" },
                    { "parent": 2, "id": 4, "content": "Job offers steady income, benefits (health insurance, retirement)" },
                    { "parent": 2, "id": 5, "content": "But may have less control over schedule and projects" },
                    { "parent": 3, "id": 6, "content": "Freelancing offers freedom to choose projects and hours" },
                    { "parent": 3, "id": 7, "content": "But income can be irregular, no employer benefits" },
                    { "parent": 0, "id": 8, "content": "Do you have a strong portfolio or network to attract clients?" },
                    { "parent": 8, "id": 9, "content": "Yes, strong portfolio/network: Freelancing may be viable" },
                    { "parent": 8, "id": 10, "content": "No, limited experience/contacts: Job may provide better start" },
                    { "parent": 9, "id": 11, "content": "Freelancing allows leveraging your niche skills early" },
                    { "parent": 9, "id": 12, "content": "But requires self-marketing and client management skills" },
                    { "parent": 10, "id": 13, "content": "Job offers mentorship, training, and structured growth" },
                    { "parent": 10, "id": 14, "content": "But may limit exposure to diverse projects initially" },
                    { "parent": 0, "id": 15, "content": "How important is work-life balance to you?" },
                    { "parent": 15, "id": 16, "content": "High importance: Freelancing can offer more control" },
                    { "parent": 15, "id": 17, "content": "Moderate/low: Job may provide clearer boundaries" },
                    { "parent": 16, "id": 18, "content": "But freelancing may blur lines between work and personal time" },
                    { "parent": 17, "id": 19, "content": "Job typically has fixed hours, reducing overtime risk" },
                    { "parent": 0, "id": 20, "content": "Are you comfortable with administrative tasks (taxes, contracts)?" },
                    { "parent": 20, "id": 21, "content": "Yes, or willing to learn: Freelancing is manageable" },
                    { "parent": 20, "id": 22, "content": "No, prefer simplicity: Job handles these for you" },
                    { "parent": 21, "id": 23, "content": "Freelancing requires managing invoices, taxes, legal aspects" },
                    { "parent": 22, "id": 24, "content": "Job provides HR support and less paperwork for you" },
                    { "parent": 0, "id": 25, "content": "What are your long-term career goals?" },
                    { "parent": 25, "id": 26, "content": "Build a business/be your own boss: Freelancing path" },
                    { "parent": 25, "id": 27, "content": "Climb corporate ladder/gain title progression: Job path" },
                    { "parent": 26, "id": 28, "content": "Freelancing can lead to entrepreneurship but has higher risk" },
                    { "parent": 27, "id": 29, "content": "Job offers promotions, stability, and recognized experience" }
                ]`)

        // axios.post("https://openrouter.ai/api/v1/chat/completions",
        //     {
        //         "model": "deepseek/deepseek-chat-v3.1:free",
        //         "messages": [
        //             {
        //                 "role": "system",
        //                 "content": systemPrompt
        //             },
        //             {
        //                 "role": "user",
        //                 "content": userPrompt.current.value
        //             }
        //         ]
        //     },
        //     {
        //         headers: {
        //             "Authorization": "Bearer " + JSON.parse(localStorage.getItem('openRouterKey')),
        //             "Content-Type": "application/json"
        //         }
        //     })
        //     .then(response => {
        //         console.log(response.data.choices[0].message.content)

        //         //Side-effect:
        //         props.addNewTree(response.data.choices[0].message.content)
        //     })
    }

    return <div>
        <h2>Prompt</h2>

        <input type="text" placeholder="Kindly enter the details of the issue you would like help deciding on. Please be as detailed as possible." ref={userPrompt}></input>

        <button onClick={getTreeGenerationData}>Initiate tree generation</button>
    </div>
}

export default memo(TreeGenerator)