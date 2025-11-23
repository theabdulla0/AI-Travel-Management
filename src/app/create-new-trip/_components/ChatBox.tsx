"use client";
import axios from "axios";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Send,
  Bot,
  User,
  Sparkles,
  Calendar,
  Users,
  DollarSign,
  Target,
  Home,
  Plane,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { v4 as uuidv4 } from "uuid";
import { saveTrip } from "@/app/actions/trip";
import { useUserDetail } from "@/app/provider";


interface Message {
  id: string;
  content: string;
  role: "user" | "bot";
  timestamp: Date;
  options?: string[];
  type?: "text" | "success" | "error" | "loading";
}

interface TripData {
  origin?: string;
  destination?: string;
  duration?: string;
  travelType?: string;
  budget?: string;
  purpose?: string[];
  specialRequirements?: string;
}

interface ChatBoxProps {
  onTripGenerated?: (tripPlan: any) => void;
  onTripDataUpdate?: (tripData: TripData) => void;
}

const QUESTIONS = [
  {
    id: "origin",
    text: "Where are you traveling from? 🏠",
    field: "origin",
    type: "text",
    icon: Home,
    placeholder: "e.g., New York, London, Tokyo...",
  },
  {
    id: "destination",
    text: "Where would you like to go? ✈️",
    field: "destination",
    type: "text",
    icon: Plane,
    placeholder: "e.g., Paris, Bali, Rome...",
  },
  {
    id: "duration",
    text: "How many days are you planning to travel? 📅",
    field: "duration",
    type: "text",
    icon: Calendar,
    placeholder: "e.g., 5 days, 1 week, 2 weeks...",
  },
  {
    id: "travelType",
    text: "Who's joining you on this adventure? 👥",
    field: "travelType",
    type: "options",
    icon: Users,
    options: ["Solo", "Couple", "Family", "Friends", "Business"],
  },
  {
    id: "budget",
    text: "What's your budget range? 💰",
    field: "budget",
    type: "options",
    icon: DollarSign,
    options: ["Budget-friendly", "Moderate", "Luxury", "Ultra-luxury"],
  },
  {
    id: "purpose",
    text: "What kind of experiences are you looking for? 🎯 (You can select multiple)",
    field: "purpose",
    type: "multiple",
    icon: Target,
    options: [
      "Sightseeing",
      "Adventure",
      "Honeymoon",
      "Business",
      "Culture",
      "Food & Dining",
      "Relaxation",
      "Nightlife",
      "Shopping",
      "Photography",
    ],
  },
  {
    id: "special",
    text: "Any special requirements or preferences? (Optional) 📝",
    field: "specialRequirements",
    type: "text",
    icon: Sparkles,
    placeholder:
      "e.g., vegetarian restaurants, wheelchair accessible, near beach...",
  },
];

function ChatBox({ onTripGenerated, onTripDataUpdate }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi! I'm your AI travel assistant. 🌍 Let me help you plan the perfect trip! I'll ask you a few questions to understand your travel preferences.",
      role: "bot",
      timestamp: new Date(),
    },
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [tripData, setTripData] = useState<TripData>({});
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const [isGeneratingTrip, setIsGeneratingTrip] = useState(false);
  const [lastTripPlan, setLastTripPlan] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const { userDetail } = useUserDetail();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);



  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    onTripDataUpdate?.(tripData);
  }, [tripData, onTripDataUpdate]);

  const hasInitialized = useRef(false);



  const handleSaveTrip = async (data?: {
    tripDetail: any;
    tripId: string;
    userId?: string;
  }) => {
    const tripDetail = data?.tripDetail || lastTripPlan;

    if (!tripDetail) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: "No trip plan to save yet. Generate a plan first.",
          role: "bot",
          timestamp: new Date(),
        },
      ]);
      return;
    }
    try {
      setIsSaving(true);
      const tripId = data?.tripId || uuidv4();
      await saveTrip({
        tripDetail: tripDetail,
        tripId: tripId,
        userId: data?.userId || userDetail?._id, // Assuming userDetail has _id from MongoDB
      });
      console.log("Trip Saved");

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: "✅ Trip saved successfully!",
          role: "bot",
          timestamp: new Date(),
          type: "success",
        },
      ]);
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: `❌ Failed to save trip: ${e.message || "Unknown error"}`,
          role: "bot",
          timestamp: new Date(),
          type: "error",
        },
      ]);
    } finally {
      setIsSaving(false);
    }
  };

  const formatTripPlanMessage = (tripPlan: any) => {
    return `✨ Your ${tripPlan.tripTitle || "Trip"} is Ready!

📍 Destination: ${tripPlan.destination?.city}, ${tripPlan.destination?.country}
📅 Duration: ${tripPlan.durationDays} days
💰 Budget: ${tripPlan.budgetCategory}
👥 Group: ${tripPlan.groupSize}

📋 Highlights:
${
  tripPlan.itinerary
    ?.slice(0, 3)
    .map(
      (day: any) =>
        `Day ${day.day}: ${day.title}
• Morning: ${day.activities?.[0]?.name || "Arrival & Check-in"}
• Afternoon: ${day.activities?.[1]?.name || "Explore the area"}
• Evening: ${day.activities?.[2]?.name || "Local dining"}
🏨 Stay: ${day.hotel?.name || "Selected accommodation"}`
    )
    .join("\n") || "Detailed itinerary available"
}

💵 Estimated Costs:
• Total: ${tripPlan.estimatedCost?.total || "—"}
• Per Person: ${tripPlan.estimatedCost?.perPerson || "—"}`;
  };

  const generateTripPlan = async () => {
    if (isGeneratingTrip) return;
    setIsGeneratingTrip(true);

    try {
      const generatingMessage: Message = {
        id: Date.now().toString(),
        content:
          "🎯 Creating your personalized itinerary...\n\nThis may take a few moments as I:\n• Research the best attractions\n• Find stays\n• Plan daily activities\n• Estimate costs",
        role: "bot",
        timestamp: new Date(),
        type: "loading",
      };
      setMessages((prev) => [...prev, generatingMessage]);

      const resp = await axios.post(
        "/api/aimodel",
        {
          tripData: {
            origin: tripData.origin ?? "",
            destination: tripData.destination ?? "",
            duration: tripData.duration ?? "",
            travelType: tripData.travelType ?? "",
            budget: tripData.budget ?? "",
            purpose: tripData.purpose ?? [],
            specialRequirements: tripData.specialRequirements ?? "",
          },
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const ct = String(resp.headers["content-type"] || "");
      if (!ct.includes("application/json"))
        throw new Error("API returned non-JSON (likely an error page).");

      const result = resp.data;

      if (result?.success && result?.data) {
        const tripPlan = result.data;
        setLastTripPlan(tripPlan); // keep locally for Save

        const successMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: formatTripPlanMessage(tripPlan),
          role: "bot",
          timestamp: new Date(),
          type: "success",
        };

        setMessages((prev) =>
          prev.filter((m) => m.type !== "loading").concat(successMessage)
        );
        onTripGenerated?.(tripPlan);

        setTimeout(async () => {
          // Auto-save the trip
          try {
            const tripId = uuidv4();
            await handleSaveTrip({
              tripDetail: tripPlan,
              tripId: tripId,
              userId: userDetail?._id,
            });
            console.log("Trip Auto-Saved");
            
            setMessages((prev) => [
              ...prev,
              {
                id: (Date.now() + 2).toString(),
                content: "✅ Trip saved automatically! What would you like to do next?",
                role: "bot",
                timestamp: new Date(),
                options: [
                  "View Full Itinerary",
                  "Start New Trip",
                ],
              },
            ]);
          } catch (error) {
            console.error("Auto-save failed:", error);
             setMessages((prev) => [
              ...prev,
              {
                id: (Date.now() + 2).toString(),
                content: "Trip generated but failed to save automatically. You can try saving manually.",
                role: "bot",
                timestamp: new Date(),
                options: [
                  "View Full Itinerary",
                  "Save Trip",
                  "Start New Trip",
                ],
              },
            ]);
          }
        }, 800);
      } else {
        throw new Error(result?.error || "Failed to generate trip plan");
      }
    } catch (error: any) {
      const apiMsg =
        error?.response?.data?.error ||
        error?.message ||
        "Unknown error occurred";
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: `❌ I encountered an issue while creating your trip plan.\n\nError: ${apiMsg}\n\nWould you like to try again or modify your preferences?`,
        role: "bot",
        timestamp: new Date(),
        type: "error",
        options: ["Try again", "Modify Preferences", "Contact Support"],
      };
      setMessages((prev) =>
        prev.filter((m) => m.type !== "loading").concat(errorMessage)
      );

    } finally {
      setIsGeneratingTrip(false);
    }
  };

  const generateTripSummary = useCallback(() => {
    setIsTyping(true);
    setTimeout(() => {
      const summary = `Perfect! Here's what I've gathered:

From: ${tripData.origin}
To: ${tripData.destination}
Duration: ${tripData.duration}
Group: ${tripData.travelType}
Budget: ${tripData.budget}
Interests: ${tripData.purpose?.join(", ") || "—"}
${tripData.specialRequirements ? `Special: ${tripData.specialRequirements}` : ""}

Let me create your personalized itinerary...`;

      const botMessage: Message = {
        id: Date.now().toString(),
        content: summary,
        role: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      setTimeout(() => {
        generateTripPlan();
      }, 1000);
    }, 700);
  }, [tripData]);

  const askNextQuestion = useCallback(() => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < QUESTIONS.length) {
      setCurrentQuestionIndex(nextIndex);
      const question = QUESTIONS[nextIndex];

      setIsTyping(true);
      setTimeout(() => {
        const botMessage: Message = {
          id: Date.now().toString(),
          content: question.text,
          role: "bot",
          timestamp: new Date(),
          options:
            question.type === "options" || question.type === "multiple"
              ? question.options
              : undefined,
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
        if (question.type === "multiple") setSelectedOptions([]);
      }, 600);
    } else {
      generateTripSummary();
    }
  }, [currentQuestionIndex, generateTripSummary]);

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      setTimeout(() => {
        askNextQuestion();
      }, 1000);
    }
  }, [askNextQuestion]);









  const handleOptionClick = async (option: string) => {
    const currentQuestion = QUESTIONS[currentQuestionIndex];

    if (option === "Try again") {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: option,
          role: "user",
          timestamp: new Date(),
        },
      ]);
      if (!isGeneratingTrip) generateTripPlan();
      return;
    }
    if (option === "Modify Preferences") {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: option,
          role: "user",
          timestamp: new Date(),
        },
      ]);
      setCurrentQuestionIndex(-1);
      setTripData({});
      setSelectedOptions([]);
      setTimeout(() => askNextQuestion(), 300);
      return;
    }
    if (option === "Contact Support") {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: option,
          role: "user",
          timestamp: new Date(),
        },
        {
          id: (Date.now() + 1).toString(),
          content:
            "You can reach us at support@example.com. We’ll get back within 24 hours.",
          role: "bot",
          timestamp: new Date(),
        },
      ]);
      return;
    }
    if (option === "Save Trip") {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: option,
          role: "user",
          timestamp: new Date(),
        },
      ]);
      await handleSaveTrip();
      return;
    }

    if (
      option === "View Full Itinerary" ||
      option === "Modify Trip" ||
      option === "Start New Trip"
    ) {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: option,
        role: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);

      if (option === "Start New Trip") {
        setCurrentQuestionIndex(-1);
        setTripData({});
        setSelectedOptions([]);
        setLastTripPlan(null);
        setLastTripPlan(null);
        setTimeout(() => askNextQuestion(), 300);
      } else if (option === "View Full Itinerary") {
        if (!lastTripPlan) {
           setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              content: "No itinerary available yet. Please generate a trip first.",
              role: "bot",
              timestamp: new Date(),
            },
          ]);
        } else {
           setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              content: "You can view the full itinerary in the Trip Details panel on the right.",
              role: "bot",
              timestamp: new Date(),
            },
          ]);
        }
      } else {
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: `Processing "${option}"... This feature will be implemented soon!`,
          role: "bot",
          timestamp: new Date(),
        };
        setTimeout(() => {
          setMessages((prev) => [...prev, responseMessage]);
        }, 400);
      }
      return;
    }

    // selection flow
    if (currentQuestion?.type === "multiple") {
      const newSelected = selectedOptions.includes(option)
        ? selectedOptions.filter((o) => o !== option)
        : [...selectedOptions, option];
      setSelectedOptions(newSelected);
    } else {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: option,
        role: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setTripData((prev) => ({ ...prev, [currentQuestion.field]: option }));
      askNextQuestion();
    }
  };

  const handleMultipleSubmit = () => {
    if (selectedOptions.length === 0) return;
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    const userMessage: Message = {
      id: Date.now().toString(),
      content: selectedOptions.join(", "),
      role: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setTripData((prev) => ({
      ...prev,
      [currentQuestion.field]: selectedOptions,
    }));
    askNextQuestion();
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const currentQuestion = QUESTIONS[currentQuestionIndex];

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    if (currentQuestion && currentQuestion.type === "text") {
      setTripData((prev) => ({ ...prev, [currentQuestion.field]: inputValue }));
      setInputValue("");
      askNextQuestion();
    } else {
      setInputValue("");
      setIsTyping(true);
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content:
            "I understand you have additional questions. Once we finish the questionnaire, I can help more.",
          role: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 800);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSkip = () => {
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    if (currentQuestion?.field === "specialRequirements") {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: "Skip",
        role: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      askNextQuestion();
    }
  };

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const showOptions =
    currentQuestion?.type === "options" || currentQuestion?.type === "multiple";

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-h-[800px] bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              {isSaving ? (
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              ) : (
                <Bot className="w-5 h-5 text-white" />
              )}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-neutral-900" />
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-white">
              AI Travel Assistant
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {isGeneratingTrip
                ? "Generating your trip plan..."
                : currentQuestionIndex >= 0 &&
                    currentQuestionIndex < QUESTIONS.length
                  ? `Question ${currentQuestionIndex + 1} of ${QUESTIONS.length}`
                  : "Always here to help plan your journey"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isGeneratingTrip ? (
            <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
          ) : (
            <Sparkles className="w-5 h-5 text-yellow-500" />
          )}
          <span className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
            {isGeneratingTrip ? "Generating..." : "AI Powered"}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            <div
              className={cn(
                "flex gap-3",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "bot" && (
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  {message.type === "loading" ? (
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                  ) : message.type === "success" ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : message.type === "error" ? (
                    <AlertCircle className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2",
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : message.type === "success"
                      ? "bg-green-50 dark:bg-green-900/20 text-neutral-900 dark:text-white border border-green-200 dark:border-green-800"
                      : message.type === "error"
                        ? "bg-red-50 dark:bg-red-900/20 text-neutral-900 dark:text-white border border-red-200 dark:border-red-800"
                        : message.type === "loading"
                          ? "bg-blue-50 dark:bg-blue-900/20 text-neutral-900 dark:text-white border border-blue-200 dark:border-blue-800"
                          : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p
                  className={cn(
                    "text-xs mt-1",
                    message.role === "user"
                      ? "text-blue-100"
                      : "text-neutral-500 dark:text-neutral-400"
                  )}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {message.role === "user" && (
                <div className="flex-shrink-0 w-8 h-8 bg-neutral-600 dark:bg-neutral-700 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Options */}
            {message.role === "bot" && message.options && (
              <div className="ml-11 mt-3 flex flex-wrap gap-2">
                {message.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionClick(option)}
                    disabled={isGeneratingTrip || isSaving}
                    className={cn(
                      "px-3 py-1.5 text-sm rounded-full border transition-all",
                      selectedOptions.includes(option)
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-400 dark:hover:text-blue-400",
                      (isGeneratingTrip || isSaving) &&
                        "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {option}
                  </button>
                ))}
                {currentQuestion?.type === "multiple" &&
                  selectedOptions.length > 0 && (
                    <button
                      onClick={handleMultipleSubmit}
                      disabled={isGeneratingTrip || isSaving}
                      className="px-4 py-1.5 text-sm rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue →
                    </button>
                  )}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-neutral-200 dark:border-neutral-800 p-4">
        {currentQuestion?.field === "specialRequirements" && (
          <div className="mb-2 flex justify-end">
            <button
              onClick={handleSkip}
              disabled={isGeneratingTrip || isSaving}
              className="text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 disabled:opacity-50"
            >
              Skip this question →
            </button>
          </div>
        )}

        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                currentQuestion?.placeholder ||
                "Type your answer or ask me anything..."
              }
              disabled={
                (showOptions && currentQuestion?.type !== "multiple") ||
                isGeneratingTrip ||
                isSaving
              }
              className="w-full px-4 py-3 pr-12 bg-neutral-100 dark:bg-neutral-800 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-neutral-900 dark:text-white placeholder:text-neutral-500 dark:placeholder:text-neutral-400 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              rows={1}
              style={{ minHeight: 48, maxHeight: 120 }}
            />
            {currentQuestion && (
              <div className="absolute right-2 bottom-3">
                {React.createElement(currentQuestion.icon, {
                  className: "w-5 h-5 text-neutral-400",
                })}
              </div>
            )}
          </div>
          <button
            onClick={handleSend}
            disabled={
              !inputValue.trim() ||
              (showOptions && currentQuestion?.type !== "multiple") ||
              isGeneratingTrip ||
              isSaving
            }
            className="flex-shrink-0 w-12 h-12 bg-blue-500 hover:bg-blue-600 disabled:bg-neutral-300 dark:disabled:bg-neutral-700 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-colors"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

    </div>
  );
}

export default ChatBox;
