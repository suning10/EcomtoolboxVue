<template>
  <div class="chat-widget">
    <!-- Floating toggle button -->
    <transition name="bubble">
      <button
        v-if="!isOpen"
        class="chat-widget-btn"
        title="AI Chat"
        @click="open"
      >
        <i class="el-icon-chat-dot-round" />
        <span v-if="unreadCount > 0" class="unread-badge">{{ unreadCount }}</span>
      </button>
    </transition>

    <!-- Chat panel -->
    <transition name="panel">
      <div v-if="isOpen" class="chat-panel">
        <!-- Header -->
        <div class="panel-header">
          <div class="panel-header-left">
            <span class="panel-avatar">AI</span>
            <div>
              <div class="panel-title">AI Assistant</div>
              <div class="panel-status">Online</div>
            </div>
          </div>
          <div class="panel-header-actions">
            <button class="header-btn" title="New chat" @click="clearMessages">
              <i class="el-icon-edit" />
            </button>
            <button class="header-btn" title="Open full page" @click="goFullPage">
              <i class="el-icon-full-screen" />
            </button>
            <button class="header-btn close-btn" title="Close" @click="close">
              <i class="el-icon-close" />
            </button>
          </div>
        </div>

        <!-- Messages -->
        <div ref="msgArea" class="panel-messages">
          <div v-if="messages.length === 0" class="panel-empty">
            <i class="el-icon-chat-line-round panel-empty-icon" />
            <p>Hi! How can I help you today?</p>
          </div>

          <div
            v-for="(msg, idx) in messages"
            :key="idx"
            class="panel-msg"
            :class="msg.role"
          >
            <span v-if="msg.role === 'assistant'" class="msg-avatar-ai">AI</span>
            <div class="msg-body">
              <div class="msg-content" v-html="formatMessage(msg.content)" />
              <div class="msg-time">{{ msg.time }}</div>
            </div>
            <span v-if="msg.role === 'user'" class="msg-avatar-user">
              <i class="el-icon-user" />
            </span>
          </div>

          <div v-if="isLoading" class="panel-msg assistant">
            <span class="msg-avatar-ai">AI</span>
            <div class="msg-body">
              <div class="typing-dots">
                <span /><span /><span />
              </div>
            </div>
          </div>
        </div>

        <!-- Input -->
        <div class="panel-input-area">
          <el-input
            v-model="inputText"
            type="textarea"
            :rows="1"
            :autosize="{ minRows: 1, maxRows: 4 }"
            placeholder="Ask anything..."
            :disabled="isLoading"
            class="panel-input"
            @keydown.native="handleKeydown"
          />
          <button
            class="panel-send-btn"
            :class="{ active: inputText.trim() && !isLoading }"
            :disabled="!inputText.trim() || isLoading"
            @click="sendMessage"
          >
            <i :class="isLoading ? 'el-icon-loading' : 'el-icon-s-promotion'" />
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { sendChatMessage, ChatResponse } from '@/api/chat'

interface Message {
  role: 'user' | 'assistant'
  content: string
  time: string
}

@Component({ name: 'ChatWidget' })
export default class ChatWidget extends Vue {
  private isOpen = false
  private inputText = ''
  private isLoading = false
  private messages: Message[] = []
  private unreadCount = 0
  private sessionId: string | null = null

  private formatTime(): string {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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

  private open() {
    this.isOpen = true
    this.unreadCount = 0
    this.$nextTick(this.scrollToBottom)
  }

  private close() {
    this.isOpen = false
  }

  private clearMessages() {
    this.messages = []
    this.sessionId = null
  }

  private goFullPage() {
    this.$router.push('/chat')
    this.close()
  }

  private handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      this.sendMessage()
    }
  }

  private async sendMessage() {
    const text = this.inputText.trim()
    if (!text || this.isLoading) return

    this.messages.push({ role: 'user', content: text, time: this.formatTime() })
    this.inputText = ''
    this.isLoading = true
    this.$nextTick(this.scrollToBottom)

    try {
      const res = await sendChatMessage({ message: text, session_id: this.sessionId })
      const data = res.data as ChatResponse
      this.sessionId = data.session_id
      this.messages.push({ role: 'assistant', content: data.response || 'No response received.', time: this.formatTime() })

      if (!this.isOpen) this.unreadCount++
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || 'Something went wrong.'
      this.messages.push({ role: 'assistant', content: `Error: ${errMsg}`, time: this.formatTime() })
    } finally {
      this.isLoading = false
      this.$nextTick(this.scrollToBottom)
    }
  }

  private scrollToBottom() {
    const el = this.$refs.msgArea as HTMLElement
    if (el) el.scrollTop = el.scrollHeight
  }
}
</script>

<style lang="scss" scoped>
.chat-widget {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 9999;
}

/* ─── Toggle button ─── */
.chat-widget-btn {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #343744;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  transition: background 0.2s, transform 0.15s;
  position: relative;

  &:hover {
    background: #ffc200;
    color: #343744;
    transform: scale(1.08);
  }
}

.unread-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #f56c6c;
  color: #fff;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ─── Chat panel ─── */
.chat-panel {
  width: 360px;
  height: 500px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ─── Header ─── */
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  background: #343744;
  color: #fff;
  flex-shrink: 0;
}

.panel-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.panel-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #ffc200;
  color: #343744;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.panel-title {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

.panel-status {
  font-size: 11px;
  color: #4cdf80;
}

.panel-header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.header-btn {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
  }
}

.close-btn:hover {
  background: rgba(245, 108, 108, 0.25);
  color: #f56c6c;
}

/* ─── Messages ─── */
.panel-messages {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: #d0d5de; border-radius: 4px; }
}

.panel-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #aab0bc;
  text-align: center;
  font-size: 13px;
  gap: 8px;
  padding: 20px 0;

  .panel-empty-icon { font-size: 36px; }
  p { margin: 0; }
}

.panel-msg {
  display: flex;
  align-items: flex-end;
  gap: 7px;

  &.user { flex-direction: row-reverse; }
}

.msg-avatar-ai,
.msg-avatar-user {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  font-size: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.msg-avatar-ai {
  background: #ffc200;
  color: #343744;
}

.msg-avatar-user {
  background: #343744;
  color: #fff;
  font-size: 13px;
}

.msg-body {
  max-width: 240px;
  display: flex;
  flex-direction: column;
}

.msg-content {
  padding: 9px 12px;
  font-size: 13px;
  line-height: 1.55;
  word-break: break-word;
  border-radius: 12px;

  .panel-msg.user & {
    background: #343744;
    color: #fff;
    border-bottom-right-radius: 3px;
  }

  .panel-msg.assistant & {
    background: #f3f4f7;
    color: #2d3344;
    border-bottom-left-radius: 3px;
  }

  ::v-deep code {
    background: rgba(0, 0, 0, 0.08);
    padding: 1px 4px;
    border-radius: 3px;
    font-family: 'SFMono-Regular', Consolas, monospace;
    font-size: 12px;
  }
}

.msg-time {
  font-size: 10px;
  color: #aab0bc;
  margin-top: 3px;
  padding: 0 3px;

  .panel-msg.user & { text-align: right; }
}

/* ─── Typing dots ─── */
.typing-dots {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 11px 14px;
  background: #f3f4f7;
  border-radius: 12px;
  border-bottom-left-radius: 3px;

  span {
    width: 6px;
    height: 6px;
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
  30% { transform: translateY(-5px); }
}

/* ─── Input area ─── */
.panel-input-area {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 10px 12px;
  border-top: 1px solid #ebeef5;
  flex-shrink: 0;
}

.panel-input {
  flex: 1;

  ::v-deep .el-textarea__inner {
    border-radius: 10px;
    border-color: #e0e4ed;
    font-size: 13px;
    padding: 8px 12px;
    resize: none;
    line-height: 1.5;

    &:focus {
      border-color: #343744;
      box-shadow: none;
    }

    &::placeholder { color: #aab0bc; }
  }
}

.panel-send-btn {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: none;
  background: #d0d5de;
  color: #fff;
  cursor: pointer;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  flex-shrink: 0;

  &.active {
    background: #343744;

    &:hover { background: #ffc200; color: #343744; }
  }

  &:disabled { cursor: not-allowed; }
}

/* ─── Transitions ─── */
.bubble-enter-active,
.bubble-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.bubble-enter,
.bubble-leave-to {
  opacity: 0;
  transform: scale(0.6);
}

.panel-enter-active,
.panel-leave-active {
  transition: opacity 0.25s, transform 0.25s;
  transform-origin: bottom right;
}
.panel-enter,
.panel-leave-to {
  opacity: 0;
  transform: scale(0.85) translateY(20px);
}
</style>
