"use client"

import { useState, useRef, useEffect } from "react"
import { Send, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: string
  content: string
  sender: "user" | "support"
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! How can I assist you today?",
    sender: "support",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
]

export default function SupportChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isAtBottom, setIsAtBottom] = useState(true)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prevMessages) => [...prevMessages, userMessage])
    setNewMessage("")

    // Simulate support response
    setTimeout(() => {
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thank you for your message. Our team will get back to you shortly.",
        sender: "support",
        timestamp: new Date(),
      }
      setMessages((prevMessages) => [...prevMessages, supportMessage])
    }, 1000)
  }

  const handleScroll = () => {
    if (scrollAreaRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current
      setIsAtBottom(scrollHeight - scrollTop === clientHeight)
    }
  }

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom()
    }
  }, [messages, isAtBottom])

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Support Chat</h1>
        <Button variant="outline" className="border-[#007BFF] text-[#007BFF] hover:bg-[#007BFF] hover:text-white">
          View FAQ
        </Button>
      </div>
      <div className="relative flex-1 rounded-lg border bg-background">
        <ScrollArea 
          ref={scrollAreaRef} 
          className="h-full p-4" 
          onScroll={handleScroll}
        >
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex max-w-[80%] items-start space-x-2 ${
                    message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={message.sender === "user" ? "/placeholder.svg?height=32&width=32" : "/placeholder.svg?height=32&width=32&text=S"}
                    />
                    <AvatarFallback>
                      {message.sender === "user" ? "U" : "S"}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-[#007BFF] text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="mt-1 text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>
        {!isAtBottom && (
          <Button
            variant="outline"
            size="icon"
            className="absolute bottom-4 right-4 rounded-full"
            onClick={scrollToBottom}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex space-x-2">
        <Input
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1"
        />
        <Button onClick={sendMessage} className="bg-[#007BFF] hover:bg-[#007BFF]/90">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

