<template>
  <div class="chat-page">
    <!-- Conversation Sidebar -->
    <div class="chat-sidebar">
      <div class="new-chat-btn" @click="startNewConversation">
        <i class="el-icon-edit-outline" />
        <span>New Chat</span>
      </div>

      <div class="conversation-list">
        <div
          v-for="(conv, idx) in conversations"
          :key="conv.id"
          class="conversation-item"
          :class="{ active: session_id === conv.id }"
          @click="selectConversation(conv.id)"
        >
          <i class="el-icon-chat-dot-round conversation-icon" />
          <span class="conversation-title">{{ conv.title }}</span>
          <i
            class="el-icon-delete conversation-delete"
            @click.stop="deleteConversation(idx)"
          />
        </div>
        <div v-if="isSessionsLoading" class="no-conversations">
          Loading…
        </div>
        <div v-else-if="conversations.length === 0" class="no-conversations">
          No conversations yet
        </div>
      </div>
    </div>

    <!-- Main Chat Area -->
    <div class="chat-main">
      <!-- Toolbar -->
      <div class="chat-toolbar">
        <el-switch v-model="showReasoning" active-color="#343744" />
        <span class="toolbar-label">Show reasoning &amp; tool calls</span>
      </div>

      <!-- Messages -->
      <div ref="messageArea" class="message-area">
        <!-- Empty state -->
        <div v-if="currentMessages.length === 0" class="empty-state">
          <div class="empty-icon">
            <i class="el-icon-chat-line-round" />
          </div>
          <h2 class="empty-title">How can I help you?</h2>
          <p class="empty-subtitle">Ask me anything. I'm ready to assist.</p>
        </div>

        <!-- Messages -->
        <div
          v-for="(msg, idx) in currentMessages"
          :key="idx"
          class="message-row"
          :class="msg.role"
        >
          <div class="message-avatar">
            <span v-if="msg.role === 'assistant'" class="avatar-ai">AI</span>
            <span v-else class="avatar-user">
              <i class="el-icon-user" />
            </span>
          </div>
          <div class="message-bubble">
            <div
              v-if="showReasoning && msg.role === 'assistant' && msg.toolCalls && msg.toolCalls.length"
              class="message-tools"
            >
              <div v-for="(tc, tIdx) in msg.toolCalls" :key="tIdx" class="tool-call-item">
                <i class="el-icon-cpu" />
                <span class="tool-call-name">{{ tc.tool }}</span>
                <span v-if="!tc.done" class="tool-call-status running">running…</span>
                <span v-else class="tool-call-status done">done</span>
                <div v-if="tc.done && tc.content" class="tool-call-result">{{ tc.content }}</div>
              </div>
            </div>
            <div
              v-if="showReasoning && msg.role === 'assistant' && msg.reasoning"
              class="message-reasoning"
            >
              <div class="reasoning-label">Reasoning</div>
              <div class="reasoning-content" v-html="formatMessage(msg.reasoning)" />
            </div>
            <div v-if="msg.content" class="message-content" v-html="formatMessage(msg.content)" />
            <div
              v-else-if="isStreaming && idx === currentMessages.length - 1"
              class="typing-indicator"
            >
              <span /><span /><span />
            </div>
            <span
              v-if="isStreaming && idx === currentMessages.length - 1 && msg.role === 'assistant'"
              class="stream-cursor"
            />
            <div class="message-time">{{ msg.time }}</div>
          </div>
        </div>

        <!-- Waiting-for-first-token indicator -->
        <div v-if="isWaitingForStream" class="message-row assistant">
          <div class="message-avatar">
            <span class="avatar-ai">AI</span>
          </div>
          <div class="message-bubble">
            <div class="typing-indicator">
              <span /><span /><span />
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="input-area">
        <div class="input-wrapper">
          <el-input
            ref="inputRef"
            v-model="userInput"
            type="textarea"
            :rows="1"
            :autosize="{ minRows: 1, maxRows: 6 }"
            placeholder="Message AI..."
            class="chat-input"
            :disabled="isStreaming"
            @keydown.native="handleKeydown"
          />
          <button
            v-if="isStreaming"
            class="send-btn"
            title="Stop generating"
            @click="stopStreaming"
          >
            <i class="el-icon-video-pause" />
          </button>
          <button
            v-else
            class="send-btn"
            :class="{ disabled: !userInput.trim() }"
            :disabled="!userInput.trim()"
            @click="sendMessage"
          >
            <i class="el-icon-s-promotion" />
          </button>
        </div>
        <p class="input-hint">Press Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { streamChatMessage, getChatSessions, getChatSessionMessages, deleteChatSession, ChatSessionRead, ChatSessionMessages } from '@/api/chat'

interface ToolCallEntry {
  tool: string
  content: string
  done: boolean
}

interface Message {
  role: 'user' | 'assistant'
  content: string
  reasoning?: string
  toolCalls?: ToolCallEntry[]
  time: string
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
  sessionId: string | null
  messagesLoaded: boolean
}

@Component({ name: 'ChatStreamPage' })
export default class ChatStreamPage extends Vue {
  private userInput = ''
  private isSessionsLoading = false
  private isStreaming = false
  private isWaitingForStream = false
  private showReasoning = false
  private conversations: Conversation[] = []
  private session_id = ''
  private abortController: AbortController | null = null

  get currentMessages(): Message[] {
    const conv = this.conversations.find(c => c.id === this.session_id)
    return conv ? conv.messages : []
  }

  private formatTime(): string {
    const now = new Date()
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  private formatMessage(content: string): string {
    return content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>')
  }

  private async loadSessions() {
    this.isSessionsLoading = true
    try {
      const res = await getChatSessions()
      const sessions = res.data as ChatSessionRead[]
      this.conversations = sessions.map(s => ({
        id: s.id,
        title: s.title || 'New Conversation',
        messages: [],
        sessionId: s.id,
        messagesLoaded: false
      }))
    } catch (err) {
      this.conversations = []
    } finally {
      this.isSessionsLoading = false
    }

    if (this.conversations.length > 0) {
      await this.selectConversation(this.conversations[0].id)
    } else {
      this.startNewConversation()
    }
  }

  private async loadConversationMessages(conv: Conversation) {
    if (conv.messagesLoaded || !conv.sessionId) return
    try {
      const res = await getChatSessionMessages(conv.sessionId)
      const data = res.data as ChatSessionMessages
      conv.messages = data.messages.map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content,
        time: ''
      }))
      conv.messagesLoaded = true
    } catch (err) {
      conv.messagesLoaded = true
    }
  }

  private startNewConversation() {
    const id = `local_${Date.now()}`
    this.conversations.unshift({
      id,
      title: 'New Conversation',
      messages: [],
      sessionId: null,
      messagesLoaded: true
    })
    this.session_id = id
  }

  private async selectConversation(id: string) {
    if (this.isStreaming) return
    this.session_id = id
    this.$nextTick(this.scrollToBottom)
    const conv = this.conversations.find(c => c.id === id)
    if (conv) await this.loadConversationMessages(conv)
    this.$nextTick(this.scrollToBottom)
  }

  private async deleteConversation(idx: number) {
    const conv = this.conversations[idx]
    if (conv.sessionId) {
      try {
        await deleteChatSession(conv.sessionId)
      } catch (err) {
        return
      }
    }
    this.conversations.splice(idx, 1)
    if (this.session_id === conv.id) {
      this.session_id = this.conversations.length > 0 ? this.conversations[0].id : ''
    }
  }

  private handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      this.sendMessage()
    }
  }

  private stopStreaming() {
    if (this.abortController) this.abortController.abort()
  }

  private async sendMessage() {
    const text = this.userInput.trim()
    if (!text || this.isStreaming) return

    if (!this.session_id) {
      console.log("start a new conversation when send message")
      this.startNewConversation()
    }

    const conv = this.conversations.find(c => c.id === this.session_id)!
    conv.messages.push({ role: 'user', content: text, time: this.formatTime() })

    if (conv.messages.filter(m => m.role === 'user').length === 1) {
      conv.title = text.length > 40 ? text.slice(0, 40) + '…' : text
    }

    this.userInput = ''
    this.isStreaming = true
    this.isWaitingForStream = true
    this.$nextTick(this.scrollToBottom)

    const assistantMsg: Message = { role: 'assistant', content: '', reasoning: '', toolCalls: [], time: this.formatTime() }
    let pushedAssistantMsg = false
    const ensurePushed = () => {
      if (!pushedAssistantMsg) {
        conv.messages.push(assistantMsg)
        pushedAssistantMsg = true
        this.isWaitingForStream = false
      }
    }
    this.abortController = new AbortController()

    try {
      await streamChatMessage(
        { message: text, session_id: conv.sessionId, include_reasoning: this.showReasoning? 'true':'false'},
        {
          onSession: (sessionId) => {
            if (!conv.sessionId) {
              conv.id = sessionId
              this.session_id = conv.id
            }
            conv.sessionId = sessionId
          },
          onReasoning: (content) => {
            ensurePushed()
            assistantMsg.reasoning += content
            this.$nextTick(this.scrollToBottom)
          },
          onToken: (content) => {
            ensurePushed()
            assistantMsg.content += content
            this.$nextTick(this.scrollToBottom)
          },
          onToolCall: (tool) => {
            ensurePushed()
            assistantMsg.toolCalls!.push({ tool, content: '', done: false })
            this.$nextTick(this.scrollToBottom)
          },
          onToolResult: (tool, content) => {
            ensurePushed()
            const pending = assistantMsg.toolCalls!.slice().reverse().find(t => t.tool === tool && !t.done)
            if (pending) {
              pending.content = content
              pending.done = true
            }
            this.$nextTick(this.scrollToBottom)
          },
          onError: (detail) => {
            ensurePushed()
            assistantMsg.content += `\n\nError: ${detail}`
          }
        },
        this.abortController.signal
      )
    } catch (err: any) {
      if (err?.name !== 'AbortError') {
        if (!pushedAssistantMsg) {
          conv.messages.push(assistantMsg)
        }
        assistantMsg.content += `\n\nError: ${err?.message || 'Something went wrong.'}`
      }
    } finally {
      this.isStreaming = false
      this.isWaitingForStream = false
      this.abortController = null
      this.$nextTick(this.scrollToBottom)
    }
  }

  private scrollToBottom() {
    const el = this.$refs.messageArea as HTMLElement
    if (el) el.scrollTop = el.scrollHeight
  }

  mounted() {
    this.loadSessions()
  }
}
</script>

<style lang="scss" scoped>
.chat-page {
  display: flex;
  height: calc(100vh - 60px);
  background: #f3f4f7;
  overflow: hidden;
}

/* ─── Sidebar ─── */
.chat-sidebar {
  width: 240px;
  min-width: 240px;
  background: #1e1f2e;
  display: flex;
  flex-direction: column;
  padding: 12px 8px;
  overflow: hidden;
}

.new-chat-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #e0e0e0;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
  margin-bottom: 12px;

  i { font-size: 16px; }

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
}

.conversation-list {
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }
}

.no-conversations {
  color: rgba(255, 255, 255, 0.3);
  font-size: 12px;
  text-align: center;
  padding: 20px 0;
}

.conversation-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 10px;
  border-radius: 8px;
  cursor: pointer;
  color: #bfcbd9;
  font-size: 13px;
  transition: background 0.15s;
  position: relative;

  &:hover {
    background: rgba(255, 255, 255, 0.07);

    .conversation-delete { opacity: 1; }
  }

  &.active {
    background: rgba(255, 194, 0, 0.15);
    color: #fff;
  }
}

.conversation-icon {
  font-size: 14px;
  flex-shrink: 0;
  color: #7c8493;
}

.conversation-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.conversation-delete {
  opacity: 0;
  font-size: 13px;
  color: #7c8493;
  flex-shrink: 0;
  transition: opacity 0.15s, color 0.15s;

  &:hover { color: #f56c6c; }
}

/* ─── Main chat ─── */
.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: #fff;
}

/* ─── Toolbar ─── */
.chat-toolbar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 10px 24px;
  border-bottom: 1px solid #ebeef5;
  flex-shrink: 0;
}

.toolbar-label {
  font-size: 12px;
  color: #8a94a6;
}

/* ─── Messages ─── */
.message-area {
  flex: 1;
  overflow-y: auto;
  padding: 24px 0;
  scroll-behavior: smooth;

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-thumb { background: #d0d5de; border-radius: 4px; }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #8a94a6;

  .empty-icon {
    font-size: 56px;
    color: #c8cdd8;
    margin-bottom: 16px;
  }

  .empty-title {
    font-size: 22px;
    font-weight: 600;
    color: #2d3344;
    margin: 0 0 8px;
  }

  .empty-subtitle {
    font-size: 14px;
    color: #8a94a6;
    margin: 0;
  }
}

.message-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  max-width: 780px;
  margin: 0 auto 20px;
  padding: 0 24px;

  &.user {
    flex-direction: row-reverse;

    .message-bubble {
      align-items: flex-end;
    }

    .message-content {
      background: #343744;
      color: #fff;
      border-radius: 18px 4px 18px 18px;
    }

    .message-time { text-align: right; }
  }

  &.assistant {
    .message-content {
      background: #f3f4f7;
      color: #2d3344;
      border-radius: 4px 18px 18px 18px;
    }
  }
}

.message-avatar {
  flex-shrink: 0;
  margin-top: 4px;
}

.avatar-ai,
.avatar-user {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 700;
}

.avatar-ai {
  background: #ffc200;
  color: #343744;
}

.avatar-user {
  background: #343744;
  color: #fff;
  font-size: 16px;
}

.message-bubble {
  display: flex;
  flex-direction: column;
  max-width: calc(100% - 46px);
}

.message-content {
  padding: 12px 16px;
  font-size: 14px;
  line-height: 1.65;
  word-break: break-word;

  ::v-deep code {
    background: rgba(0,0,0,0.08);
    padding: 1px 5px;
    border-radius: 3px;
    font-family: 'SFMono-Regular', Consolas, monospace;
    font-size: 13px;
  }
}

.message-tools {
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tool-call-item {
  padding: 8px 12px;
  border-radius: 10px;
  background: #eef1f7;
  border: 1px solid #dde3ee;
  font-size: 12px;
}

.tool-call-name {
  font-weight: 600;
  color: #343744;
  margin-right: 6px;
}

.tool-call-status {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.03em;

  &.running { color: #e6a23c; }
  &.done { color: #67c23a; }
}

.tool-call-result {
  margin-top: 4px;
  font-size: 12px;
  color: #6b7280;
  white-space: pre-wrap;
  word-break: break-word;
}

.message-reasoning {
  margin-bottom: 8px;
  padding: 10px 14px;
  border-radius: 10px;
  background: #f9f5e8;
  border: 1px solid #f0e4bc;
}

.reasoning-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #b08a2e;
  margin-bottom: 4px;
}

.reasoning-content {
  font-size: 13px;
  line-height: 1.55;
  color: #6b6250;
  word-break: break-word;
}

.stream-cursor {
  display: inline-block;
  width: 7px;
  height: 14px;
  margin-left: 24px;
  background: #343744;
  animation: blink 0.9s infinite;
  vertical-align: text-bottom;
}

@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.message-time {
  font-size: 11px;
  color: #aab0bc;
  margin-top: 4px;
  padding: 0 4px;
}

/* ─── Typing indicator ─── */
.typing-indicator {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 14px 18px;
  background: #f3f4f7;
  border-radius: 4px 18px 18px 18px;

  span {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #aab0bc;
    animation: bounce 1.2s infinite ease-in-out;

    &:nth-child(1) { animation-delay: 0s; }
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
}

@keyframes bounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-6px); }
}

/* ─── Input ─── */
.input-area {
  padding: 12px 24px 16px;
  border-top: 1px solid #ebeef5;
  background: #fff;
}

.input-wrapper {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  background: #f3f4f7;
  border-radius: 12px;
  border: 1.5px solid #e0e4ed;
  padding: 8px 8px 8px 14px;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: #343744;
  }
}

.chat-input {
  flex: 1;

  ::v-deep .el-textarea__inner {
    background: transparent;
    border: none;
    padding: 0;
    resize: none;
    font-size: 14px;
    line-height: 1.6;
    color: #2d3344;
    box-shadow: none;

    &::placeholder { color: #aab0bc; }
    &:focus { box-shadow: none; }
  }
}

.send-btn {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: none;
  background: #343744;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, transform 0.1s;

  &:hover:not(.disabled) {
    background: #ffc200;
    color: #343744;
  }

  &:active:not(.disabled) { transform: scale(0.95); }

  &.disabled {
    background: #d0d5de;
    cursor: not-allowed;
  }
}

.input-hint {
  font-size: 11px;
  color: #aab0bc;
  margin: 6px 0 0 2px;
}
</style>
