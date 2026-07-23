import request from '@/utils/request'
import { UserModule } from '@/store/modules/user'

export interface ChatRequest {
  message: string
  session_id?: string | null
}

export interface ChatResponse {
  response: string
  session_id: string
}

export interface ChatSessionRead {
  id: string
  title: string | null
  created_at: string
  updated_at: string
  message_count: number
}

export interface ChatMessage {
  role: string
  content: string
}

export interface ChatSessionMessages {
  session_id: string
  messages: ChatMessage[]
}

export const sendChatMessage = (data: ChatRequest) =>
  request({
    url: '/ai/chat',
    method: 'post',
    data
  })

export const getChatSessions = () =>
  request({
    url: '/ai/chat/sessions',
    method: 'get'
  })

export const getChatSessionMessages = (sessionId: string) =>
  request({
    url: `/ai/chat/sessions/${sessionId}/messages`,
    method: 'get'
  })

export interface ChatStreamHandlers {
  onSession?: (sessionId: string) => void
  onToken?: (content: string) => void
  onDone?: (response: string) => void
  onError?: (detail: string) => void
}

// The stream endpoint sends SSE over a POST response, so the native
// EventSource API (GET-only) can't be used — parse the "event: ...\ndata: ...\n\n"
// frames off the fetch response stream by hand instead.
export async function streamChatMessage(data: ChatRequest, handlers: ChatStreamHandlers, signal?: AbortSignal) {
  const res = await fetch(`${process.env.VUE_APP_BASE_API}/ai/chat/stream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: UserModule.token
    },
    body: JSON.stringify(data),
    signal
  })

  if (!res.ok || !res.body) {
    throw new Error(`Stream request failed: ${res.status}`)
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { value, done } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })

    let sepIndex
    while ((sepIndex = buffer.indexOf('\n\n')) !== -1) {
      const rawEvent = buffer.slice(0, sepIndex)
      buffer = buffer.slice(sepIndex + 2)

      const eventMatch = rawEvent.match(/^event: (.*)$/m)
      const dataMatch = rawEvent.match(/^data: (.*)$/m)
      if (!eventMatch || !dataMatch) continue

      const eventName = eventMatch[1].trim()
      const payload = JSON.parse(dataMatch[1])

      switch (eventName) {
        case 'session':
          handlers.onSession?.(payload.session_id)
          break
        case 'token':
          handlers.onToken?.(payload.content)
          break
        case 'done':
          handlers.onDone?.(payload.response)
          break
        case 'error':
          handlers.onError?.(payload.detail)
          break
      }
    }
  }
}
