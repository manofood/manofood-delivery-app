# Event Emitter for React Applications

A type-safe event emitter system designed specifically for React applications. This allows components to communicate across your app without prop drilling or complex state management.

## Features

- **Type-Safe**: Full TypeScript support with strongly typed events
- **Memory Safe**: Automatic cleanup prevents memory leaks
- **Error Handling**: Graceful error handling in event handlers
- **Multiple Instances**: Support for both global and custom event emitters
- **Once Listeners**: Support for one-time event listeners
- **Listener Management**: Get listener counts and event names

## Installation

The event emitter is already set up in your project at `src/shared/event-emitter/index.ts`.

## Basic Usage

### Using the EventEmitter Class

The core EventEmitter class provides type-safe event handling:

```typescript
import { EventEmitter, eventEmitter } from '@/shared/event-emitter';

// Using the global app event emitter
eventEmitter.on('user:login', (userData) => {
  console.log('User logged in:', userData);
});

// Emit an event
eventEmitter.emit('user:login', {
  userId: '123',
  username: 'john_doe'
});

// One-time listener
eventEmitter.once('user:logout', () => {
  console.log('User logged out');
});

// Unsubscribe from an event
const unsubscribe = eventEmitter.on('order:created', (orderData) => {
  console.log('Order created:', orderData);
});

// Call unsubscribe function when done
unsubscribe();

// Or unsubscribe using the method
eventEmitter.unsubscribe('order:created');
```

### Creating Custom Event Emitters

For specific feature areas or when you need custom events:

```typescript
import { EventEmitter } from '@/shared/event-emitter';

// Define your custom events
interface CartEvents extends Record<string, unknown> {
  'item:added': { productId: string; quantity: number };
  'item:removed': { productId: string };
  'cart:cleared': null;
}

// Create a custom event emitter instance
const cartEventEmitter = new EventEmitter<CartEvents>();

// Subscribe to events
cartEventEmitter.on('item:added', (data) => {
  console.log(`Added ${data.quantity} of product ${data.productId}`);
});

// Emit events
cartEventEmitter.emit('item:added', {
  productId: 'abc123',
  quantity: 2
});
```

## Available App Events

The predefined `AppEvents` interface includes:

```typescript
interface AppEvents extends Record<string, unknown> {
  'user:login': { userId: string; username: string };
  'user:logout': null;
  'order:created': { orderId: string };
}
```

## API Reference

### EventEmitter Class

#### Methods

- `on<K>(event: K, handler: EventHandler<T[K]>): () => void`
  - Subscribe to an event
  - Returns an unsubscribe function

- `once<K>(event: K, handler: EventHandler<T[K]>): () => void`
  - Subscribe to an event that will only fire once
  - Returns an unsubscribe function

- `unsubscribe<K>(event: K, handler?: EventHandler<T[K]>): void`
  - Unsubscribe from an event
  - If no handler is provided, removes all listeners for the event

- `emit<K>(event: K, data: T[K]): void`
  - Emit an event with data

- `listenerCount<K>(event: K): number`
  - Get the number of listeners for an event

- `eventNames(): string[]`
  - Get all event names that have listeners

- `removeAllListeners(): void`
  - Remove all listeners for all events

## Best Practices

### 1. Event Naming

Use a consistent naming convention for events:
- Use colons to separate namespaces: `user:login`, `cart:update`
- Use descriptive names: `notification:show` instead of `notify`
- Use past tense for completed actions: `user:login` not `user:logging-in`

### 2. Type Safety

Always define your event types:

```typescript
interface MyEvents extends Record<string, unknown> {
  'my:event': { data: string };
  'another:event': null; // Use null for events without data
}
```

### 3. Cleanup

If you use the EventEmitter class directly, make sure to clean up subscriptions:

```typescript
// Store the unsubscribe function
const unsubscribe = emitter.on('my:event', handleEvent);

// Call it when done (e.g., in component cleanup)
unsubscribe();

// Or use the unsubscribe method
emitter.unsubscribe('my:event', handleEvent);

// Remove all listeners for an event
emitter.unsubscribe('my:event');

// Remove all listeners for all events
emitter.removeAllListeners();
```

### 4. Performance

- Avoid creating event emitters in frequently called functions
- Store event emitter instances at module level or in stable references
- Consider debouncing high-frequency events
- Use the `listenerCount()` method to monitor listener growth
- Use `eventNames()` to debug which events are active

# Usage example: Complete notification system

```typescript
// notification-system.ts
import { EventEmitter } from '@/shared/event-emitter';

interface NotificationEvents extends Record<string, unknown> {
  'notification:show': { 
    message: string; 
    type: 'success' | 'error' | 'info' | 'warning';
    duration?: number;
  };
  'notification:hide': { id: string };
}

// Create a notification event emitter
export const notificationEmitter = new EventEmitter<NotificationEvents>();

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

class NotificationManager {
  private notifications: Notification[] = [];
  private listeners: Set<(notifications: Notification[]) => void> = new Set();

  constructor() {
    notificationEmitter.on('notification:show', (data) => {
      const notification: Notification = {
        id: Date.now().toString(),
        message: data.message,
        type: data.type,
      };
      
      this.notifications.push(notification);
      this.notifyListeners();
      
      // Auto remove after specified duration or 5 seconds
      setTimeout(() => {
        this.removeNotification(notification.id);
      }, data.duration || 5000);
    });

    notificationEmitter.on('notification:hide', (data) => {
      this.removeNotification(data.id);
    });
  }

  private removeNotification(id: string) {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.notifyListeners();
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener([...this.notifications]));
  }

  subscribe(listener: (notifications: Notification[]) => void) {
    this.listeners.add(listener);
    listener([...this.notifications]); // Send current state
    
    return () => {
      this.listeners.delete(listener);
    };
  }

  getNotifications() {
    return [...this.notifications];
  }
}

export const notificationManager = new NotificationManager();

// Usage anywhere in your app
export const showNotification = (
  message: string, 
  type: 'success' | 'error' | 'info' | 'warning' = 'info',
  duration?: number
) => {
  notificationEmitter.emit('notification:show', { message, type, duration });
};

// Usage examples:
showNotification('User logged in successfully!', 'success');
showNotification('Failed to save data', 'error');
showNotification('This will stay for 10 seconds', 'info', 10000);
```

```typescript
// In a React component (if using React)
import React, { useState, useEffect } from 'react';
import { notificationManager, showNotification } from './notification-system';

const NotificationDisplay: React.FC = () => {
  const [notifications, setNotifications] = useState(notificationManager.getNotifications());

  useEffect(() => {
    const unsubscribe = notificationManager.subscribe(setNotifications);
    return unsubscribe;
  }, []);

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`p-4 rounded shadow-lg ${
            notification.type === 'success' ? 'bg-green-500 text-white' :
            notification.type === 'error' ? 'bg-red-500 text-white' :
            notification.type === 'warning' ? 'bg-yellow-500 text-black' :
            'bg-blue-500 text-white'
          }`}
        >
          <div className="flex justify-between items-center">
            <span>{notification.message}</span>
            <button
              type="button"
              onClick={() => notificationEmitter.emit('notification:hide', { id: notification.id })}
              className="ml-4 text-sm underline"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Usage in any component
const MyComponent: React.FC = () => {
  const handleSuccess = () => {
    showNotification('Operation completed successfully!', 'success');
  };

  const handleError = () => {
    showNotification('Something went wrong!', 'error');
  };

  return (
    <div>
      <button type="button" onClick={handleSuccess}>
        Success Action
      </button>
      <button type="button" onClick={handleError}>
        Error Action
      </button>
    </div>
  );
};
```

This event emitter provides a clean, type-safe way to handle cross-component communication in your React application without the complexity of global state management libraries for simple use cases.
