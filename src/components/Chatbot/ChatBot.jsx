import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFillSendFill } from 'react-icons/bs';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';

// Sample organiser data
export const organisers = [
  {
    id: "01",
    name: "Fvents",
    specialization: "Full Event",
    avgRating: 4.8,
    totalRating: 272,
    
    totalEvents: 1500,
    address: "Adyar,Chennai",
  },
  {
    id: "02",
    name: "Conx",
    specialization: "Concert",
    avgRating: 4.8,
    totalRating: 272,
   
    totalEvents: 1120,
    address: "Tambaram,Chennai.",
  },
  {
    id: "03",
    name: "PartyEx",
    specialization: "Party",
    avgRating: 4.8,
    totalRating: 272,
    
    totalEvents: 1210,
    address: "Madurai,Tamil Nadu.",
  },
];

const GenerativeAIComponent = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const apiKey = 'AIzaSyAw3m7ZX9s8zTl3aYwS9RrYoocG1hQyf5c';

  // Function to search the organiser data
  const searchOrganiser = (input) => {
    const lowerCaseInput = input.toLowerCase();
    return organisers.find(
      (org) => org.name.toLowerCase().includes(lowerCaseInput) ||
               org.specialization.toLowerCase().includes(lowerCaseInput)
    );
  };

  const generateContent = async () => {
    setLoading(true);

    // Check if user input relates to any organiser data
    const organiserMatch = searchOrganiser(prompt);
    
    if (organiserMatch) {
      // If a match is found, display the organiser information
      const responseText = `
        Organizer: ${organiserMatch.name}
        Specialization: ${organiserMatch.specialization}
        Avg. Rating: ${organiserMatch.avgRating}
        Total Events: ${organiserMatch.totalEvents}
        Address: ${organiserMatch.address}
      `;
      setMessages([...messages, { user: prompt, bot: responseText }]);
      setPrompt('');
      setLoading(false);
      return;
    }

    // If no organiser match is found, proceed to call the AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    try {
      const result = await model.generateContent(prompt);
      console.log('Result:', result); // Log the entire result to inspect it
      const response = await result.response; // Ensure result.response exists
      const text = await response.text();
      
      // Update messages state
      setMessages([...messages, { user: prompt, bot: text }]);
      setPrompt(''); // Clear the input field after submission
      console.log("Generate content called with prompt:", prompt, 'bot', text);
      
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error('Failed to generate content. Please try again.');
      setMessages([...messages, { user: prompt, bot: 'Failed to generate content.' }]);
      
    } finally {
      setLoading(false);
    }
  };

  const formatMessage = (message) => {
    // Format the message here as needed
    return message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  const toggleChatBot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen && (
        <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg overflow-hidden"> {/* Increased width here */}
          <div className="flex flex-col h-[400px]">
            <div className="px-4 py-3 border-b border-gray-300">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold text-gray-800">Eve</h2>
                <p>AI - Assistant</p>
                
                <button onClick={toggleChatBot} className="text-red-500">X</button>
              </div>
            </div>
            <div className="flex-1 p-3 overflow-y-auto flex flex-col space-y-2 bg-gray-100" id="chatDisplay">
              {messages.map((msg, index) => (
                <div key={index} className="flex flex-col">
                  {/* Display user message on the right */}
                  {msg.user && (
                    <div className="self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
                      <span dangerouslySetInnerHTML={{ __html: formatMessage(msg.user) }} />
                    </div>
                  )}
                  {/* Display bot response on the left */}
                  {msg.bot && (
                    <div className="self-start bg-gray-300 mt-2 text-black max-w-xs rounded-lg px-3 py-1.5 text-sm">
                      <span dangerouslySetInnerHTML={{ __html: formatMessage(msg.bot) }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="px-3 py-2 border-t border-gray-300">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-lg bg-gray-200 text-gray-800 text-sm"
                />
                {loading ? 
                  <BsFillSendFill className="mr-1" /> : 
                  <button
                    onClick={generateContent}
                    disabled={loading || !prompt}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg transition duration-300 ease-in-out text-sm flex items-center"
                  >
                    <BsFillSendFill className="mr-1" />
                  </button>
                }
              </div>
            </div>
          </div>
        </div>
      )}
      {isOpen ? null :
        <button
          onClick={toggleChatBot}
          className="bg-blue-600 text-white rounded-full p-3 shadow-lg size-14 hover:bg-blue-700 focus:outline-none flex items-center"
        >
          <IoChatbubbleEllipsesOutline className="size-14" />
        </button>
      }
      <ToastContainer />
    </div>
  );
};

export default GenerativeAIComponent;
