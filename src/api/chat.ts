import request from '@/utils/request'

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
