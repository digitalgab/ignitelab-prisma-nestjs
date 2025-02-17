import { Content } from '../../app/Notification/Entities/content.entity';
import { randomUUID } from 'node:crypto';

export interface NotificationParams {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  canceledAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private _id: string;
  private params: NotificationParams;

  constructor(params: NotificationParams, id?: string) {
    this._id = id ?? randomUUID();
    this.params = { ...params, createdAt: params.createdAt ?? new Date() };
  }

  public get id() {
    return this._id;
  }

  public set recipientId(recipientId: string) {
    this.params.recipientId = recipientId;
  }

  public get recipientId(): string {
    return this.params.recipientId;
  }

  public set content(content: Content) {
    this.params.content = content;
  }

  public get content(): Content {
    return this.params.content;
  }

  public set category(category: string) {
    this.params.category = category;
  }

  public get category(): string {
    return this.params.category;
  }

  public read() {
    this.params.readAt = new Date();
  }

  public unread() {
    this.params.readAt = null;
  }

  public get readAt(): Date | null | undefined {
    return this.params.readAt;
  }

  public cancel() {
    this.params.canceledAt = new Date();
  }

  public get canceledAt(): Date | null | undefined {
    return this.params.canceledAt;
  }

  public get createdAt(): Date {
    return this.params.createdAt;
  }
}
