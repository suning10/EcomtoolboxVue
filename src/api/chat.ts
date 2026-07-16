import request from '@/utils/request'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface SendMessageParams {
  messages: ChatMessage[]
  conversationId?: string
}

export const sendChatMessage = (data: SendMessageParams) =>
  request({
    url: '/ai/chat',
    method: 'post',
    data
  })
