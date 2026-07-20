import request from '@/utils/request'

export interface ChatRequest {
  message: string
  session_id?: string | null
}

export interface ChatResponse {
  response: string
  session_id: string
}

export const sendChatMessage = (data: ChatRequest) =>
  request({
    url: '/ai/chat',
    method: 'post',
    data
  })
