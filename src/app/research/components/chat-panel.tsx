"use client"

import * as React from "react"
import { Paperclip, RefreshCcw, Send } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

import { convertMarkdownToHtml } from "../../generate/utils"

type ChatMessage = {
  id: string
  role: "assistant" | "user"
  content: string
  timestamp: string
}

const mockMessages: ChatMessage[] = [
  {
    id: "assistant-1",
    role: "assistant",
    content:
      "### Research kickoff\nDrop a creator detail or target sponsor to map insight summaries, positioning, and assets in one place.",
    timestamp: "2m ago",
  },
  {
    id: "user-1",
    role: "user",
    content: "Looking for beauty brands that care about science-backed routines.",
    timestamp: "Just now",
  },
  {
    id: "assistant-2",
    role: "assistant",
    content:
      "**CeraVe**, **Glow Recipe**, and **Skinfix** all lean into derm-backed claims.\n\n- Position on barrier repair + derm approval.\n- Offer split-script draft for TikTok + IG stories.\n- Suggest a carousel CTA with IRL before/after hooks.",
    timestamp: "Just now",
  },
]

type ResearchChatPanelProps = {
  inputValue: string
  onInputChange: (value: string) => void
}

export function ResearchChatPanel({ inputValue, onInputChange }: ResearchChatPanelProps) {
  const handleSubmit = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onInputChange("")
  }, [onInputChange])

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <CardTitle>Research Chat</CardTitle>
            <CardDescription>Explore insights with AI-powered research.</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="shrink-0">
            <RefreshCcw className="mr-2 h-4 w-4" /> New Thread
          </Button>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full">
          <div className="space-y-6 p-6">
            {mockMessages.map((message) => {
              const isAssistant = message.role === "assistant"
              const renderedContent = isAssistant
                ? convertMarkdownToHtml(message.content)
                : null

              return (
                <div key={message.id} className="space-y-2">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback>
                        {isAssistant ? "AI" : "You"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-foreground">
                      {isAssistant ? "Solvi" : "You"}
                    </span>
                    <span>·</span>
                    <span>{message.timestamp}</span>
                  </div>
                  {isAssistant ? (
                    <article
                      className="prose prose-sm text-foreground dark:prose-invert"
                      dangerouslySetInnerHTML={{ __html: renderedContent ?? "" }}
                    />
                  ) : (
                    <div className="rounded-xl border bg-muted/40 px-4 py-3 text-sm text-foreground">
                      {message.content}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="w-full space-y-3">
          <Textarea
            value={inputValue}
            onChange={(event) => onInputChange(event.target.value)}
            placeholder="Ask for audience intel, brand talking points, or synthesis prompts"
            className="min-h-[120px] resize-none"
          />
          <div className="flex items-center gap-3">
            <Button type="button" variant="outline" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button type="submit" className="flex-1" disabled={!inputValue.trim()}>
              Send research prompt
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  )
}
