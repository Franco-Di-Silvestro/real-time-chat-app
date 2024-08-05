export interface Message {
  _id: string
  senderId: string
  receiverId: string
  message: string
  createdAt: string
  updatedAt: string
  shouldShake? : boolean
}
