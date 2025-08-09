/**
 * Event Emitter for React Applications
 *
 * A type-safe event emitter that allows components to produce and consume events
 * across the application without prop drilling or complex state management.
 */

import { AppEvents } from './types'

export type EventHandler<T = unknown> = (data: T) => void

export class EventEmitter<TEventMap extends Record<string, unknown> = Record<string, unknown>> {
  private listeners: Map<string, Set<EventHandler<unknown>>> = new Map()

  /**
   * Subscribe to an event
   * @param event - The event name
   * @param handler - The event handler function
   * @returns Unsubscribe function
   */
  on<K extends keyof TEventMap>(event: K & string, handler: EventHandler<TEventMap[K]>): () => void {
    const eventName = event as string

    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set())
    }

    const eventListeners = this.listeners.get(eventName)!
    const typedHandler = handler as EventHandler<unknown>
    eventListeners.add(typedHandler)

    // Return unsubscribe function
    return () => {
      eventListeners.delete(typedHandler)
      if (eventListeners.size === 0) this.listeners.delete(eventName)
    }
  }

  /**
   * Subscribe to an event that will only be triggered once
   * @param event - The event name
   * @param handler - The event handler function
   * @returns Unsubscribe function
   */
  once<K extends keyof TEventMap>(event: K & string, handler: EventHandler<TEventMap[K]>): () => void {
    const onceHandler = (data: TEventMap[K]) => {
      handler(data)
      unsubscribe()
    }

    const unsubscribe = this.on(event, onceHandler)
    return unsubscribe
  }

  /**
   * Unsubscribe from an event
   * @param event - The event name
   * @param handler - The event handler function to remove
   */
  unsubscribe<K extends keyof TEventMap>(event: K & string, handler?: EventHandler<TEventMap[K]>): void {
    const eventName = event as string
    const eventListeners = this.listeners.get(eventName)

    if (!eventListeners) return

    if (handler) {
      const typedHandler = handler as EventHandler<unknown>
      eventListeners.delete(typedHandler)
      if (eventListeners.size === 0) {
        this.listeners.delete(eventName)
      }
    } else {
      // Remove all listeners for this event
      this.listeners.delete(eventName)
    }
  }

  /**
   * Emit an event
   * @param event - The event name
   * @param data - The data to pass to event handlers
   */
  emit<K extends keyof TEventMap>(event: K & string, data: TEventMap[K]): void {
    const eventName = event as string
    const eventListeners = this.listeners.get(eventName)

    if (!eventListeners) return

    // Create a copy of listeners to avoid issues if handlers modify the listeners
    const listenersArray = Array.from(eventListeners)

    listenersArray.forEach((handler) => {
      try {
        handler(data)
      } catch (error) {
        console.error(`Error in event handler for "${eventName}":`, error)
      }
    })
  }

  /**
   * Get the number of listeners for an event
   * @param event - The event name
   * @returns Number of listeners
   */
  listenerCount<K extends keyof TEventMap>(event: K & string): number {
    const eventName = event as string
    const eventListeners = this.listeners.get(eventName)
    return eventListeners ? eventListeners.size : 0
  }

  /**
   * Get all event names that have listeners
   * @returns Array of event names
   */
  eventNames(): string[] {
    return Array.from(this.listeners.keys())
  }

  /**
   * Remove all listeners for all events
   */
  removeAllListeners(): void {
    this.listeners.clear()
  }
}

// Typed global event emitter for the application
export const eventEmitter = new EventEmitter<AppEvents>()
