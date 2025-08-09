// Common event types for the application
export interface AppEvents extends Record<string, unknown> {
  'user:login': { userId: string; username: string }
  'user:logout': null
  'order:created': { orderId: string }
}
