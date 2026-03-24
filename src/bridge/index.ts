interface BridgeMessage {
  action: string
  data?: Record<string, unknown>
  callbackId?: string
}

type BridgeHandler = (data: Record<string, unknown>) => void

const callbackMap = new Map<string, (result: unknown) => void>()
let callbackId = 0

function genCallbackId(): string {
  return `cb_${++callbackId}_${Date.now()}`
}

declare global {
  interface Window {
    webkit?: {
      messageHandlers?: {
        halochat?: {
          postMessage: (msg: BridgeMessage) => void
        }
      }
    }
    HaloChatBridge?: {
      onNativeCallback: (callbackId: string, result: unknown) => void
      handlers: Map<string, BridgeHandler>
    }
  }
}

function postMessage(msg: BridgeMessage): void {
  if (window.webkit?.messageHandlers?.halochat) {
    window.webkit.messageHandlers.halochat.postMessage(msg)
  } else {
    console.log('[Bridge] Native not available, message:', msg)
  }
}

function callNative(action: string, data?: Record<string, unknown>): Promise<unknown> {
  return new Promise((resolve) => {
    const id = genCallbackId()
    callbackMap.set(id, resolve)
    postMessage({ action, data, callbackId: id })

    setTimeout(() => {
      if (callbackMap.has(id)) {
        callbackMap.delete(id)
        resolve(null)
      }
    }, 10000)
  })
}

const bridge = {
  openDocument(docId: string) {
    return callNative('openDocument', { docId })
  },

  createDocument(type: 'doc' | 'table') {
    return callNative('createDocument', { type })
  },

  deleteDocument(docId: string) {
    return callNative('deleteDocument', { docId })
  },

  shareDocument(docId: string) {
    return callNative('shareDocument', { docId })
  },

  navigate(target: string) {
    return callNative('navigate', { target })
  },

  showNotifications() {
    return callNative('showNotifications')
  },

  registerHandler(name: string, handler: BridgeHandler) {
    if (!window.HaloChatBridge) {
      window.HaloChatBridge = {
        onNativeCallback: (cbId: string, result: unknown) => {
          const cb = callbackMap.get(cbId)
          if (cb) {
            callbackMap.delete(cbId)
            cb(result)
          }
        },
        handlers: new Map(),
      }
    }
    window.HaloChatBridge.handlers.set(name, handler)
  },
}

if (typeof window !== 'undefined') {
  bridge.registerHandler('__init__', () => {})
}

export default bridge
