import { ModelBase } from './ModelBase';

export class ModelMessage extends ModelBase {
  createTime?: number;
  receiveTime?: number;
  messageContent?: string;
  chatId?: string;
  fromName?: string;
  avatar?: string;
  isInMsg?: boolean;
}
