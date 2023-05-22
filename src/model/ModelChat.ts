import { ModelBase } from './ModelBase';

export class ModelChat extends ModelBase {
  fromName?: string;
  sendTime?: number | string;
  isSelected = false;
  lastMsg?: string;
  avatar?: string;
  chatType?: number; // 0: single chat, 1: group chat
}
