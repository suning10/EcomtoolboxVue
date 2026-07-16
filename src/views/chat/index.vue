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
          :class="{ active: activeConversationId === conv.id }"
          @click="selectConversation(conv.id)"
        >
          <i class="el-icon-chat-dot-round conversation-icon" />
          <span class="conversation-title">{{ conv.title }}</span>
          <i
            class="el-icon-delete conversation-delete"
            @click.stop="deleteConversation(idx)"
          />
        </div>
        <div v-if="conversations.length === 0" class="no-conversations">
          No conversations yet
        </div>
      </div>
    </div>

    <!-- Main Chat Area -->
    <div class="chat-main">
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
            <div class="message-content" v-html="formatMessage(msg.content)" />
            <div class="message-time">{{ msg.time }}</div>
          </div>
        </div>

        <!-- Typing indicator -->
        <div v-if="isLoading" class="message-row assistant">
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
            :disabled="isLoading"
            @keydown.native="handleKeydown"
          />
          <button
            class="send-btn"
            :class="{ disabled: !userInput.trim() || isLoading }"
            :disabled="!userInput.trim() || isLoading"
            @click="sendMessage"
          >
            <i v-if="!isLoading" class="el-icon-s-promotion" />
            <i v-else class="el-icon-loading" />
          </button>
        </div>
        <p class="input-hint">Press Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { sendChatMessage, ChatMessage } from '@/api/chat'

interface Message {
  role: 'user' | 'assistant'
  content: string
  time: string
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
}

@Component({ name: 'ChatPage' })
export default class ChatPage extends Vue {
  private userInput = ''
  private isLoading = false
  private conversations: Conversation[] = []
  private activeConversationId = ''

  get currentMessages(): Message[] {
    const conv = this.conversations.find(c => c.id === this.activeConversationId)
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

  private startNewConversation() {
    const id = `conv_${Date.now()}`
    this.conversations.unshift({
      id,
      title: 'New Conversation',
      messages: []
    })
    this.activeConversationId = id
  }

  private selectConversation(id: string) {
    this.activeConversationId = id
    this.$nextTick(this.scrollToBottom)
  }

  private deleteConversation(idx: number) {
    const conv = this.conversations[idx]
    this.conversations.splice(idx, 1)
    if (this.activeConversationId === conv.id) {
      this.activeConversationId = this.conversations.length > 0 ? this.conversations[0].id : ''
    }
  }

  private handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      this.sendMessage()
    }
  }

  private async sendMessage() {
    const text = this.userInput.trim()
    if (!text || this.isLoading) return

    // Ensure an active conversation exists
    if (!this.activeConversationId) {
      this.startNewConversation()
    }

    const conv = this.conversations.find(c => c.id === this.activeConversationId)!
    const userMsg: Message = { role: 'user', content: text, time: this.formatTime() }
    conv.messages.push(userMsg)

    // Set title from first message
    if (conv.messages.length === 1) {
      conv.title = text.length > 40 ? text.slice(0, 40) + '…' : text
    }

    this.userInput = ''
    this.isLoading = true
    this.$nextTick(this.scrollToBottom)

    try {
      const history: ChatMessage[] = conv.messages.slice(0, -1).map(m => ({
        role: m.role,
        content: m.content
      }))
      history.push({ role: 'user', content: text })

      const res: any = await sendChatMessage({
        messages: history,
        conversationId: this.activeConversationId
      })

      const reply = res?.data?.data?.content || res?.data?.content || 'No response received.'
      conv.messages.push({ role: 'assistant', content: reply, time: this.formatTime() })
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || 'Something went wrong. Please try again.'
      conv.messages.push({ role: 'assistant', content: `Error: ${errMsg}`, time: this.formatTime() })
    } finally {
      this.isLoading = false
      this.$nextTick(this.scrollToBottom)
    }
  }

  private scrollToBottom() {
    const el = this.$refs.messageArea as HTMLElement
    if (el) el.scrollTop = el.scrollHeight
  }

  mounted() {
    this.startNewConversation()
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
