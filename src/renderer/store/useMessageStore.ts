import { defineStore } from 'pinia';
import { ref } from 'vue';

import { ModelChat } from '../../model/ModelChat';
import { ModelMessage } from '../../model/ModelMessage';

export const useMessageStore = defineStore("message", () => {
  const data = ref<ModelMessage[]>([]);

  const msg1 = 'Hello, how are you?';
  const msg2 = 'I am fine, thank you, and you?';

  const initData = (chat: ModelChat) => {
    const result = [];

    for (let i = 0; i < 10; i++) {
      const model = new ModelMessage();
      model.createTime = Date.now();
      model.isInMsg = i % 2 === 0;
      model.messageContent = model.isInMsg ? msg1 : msg2;
      model.fromName = model.isInMsg ? chat.fromName : 'me';
      model.avatar = model.isInMsg ? chat.avatar : 'https://p3-passport.byteimg.com/img/user-avatar/a0bc910935bc99ccbbcaa9468245c3ab~100x100.awebp';
      model.chatId = chat.id;

      result.push(model);
    }
    data.value = result;
  };

  return {
    data,
    initData,
  };
});