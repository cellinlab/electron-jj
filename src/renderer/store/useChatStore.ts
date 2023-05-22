import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';

import { ModelChat } from '../../model/ModelChat';
import { useMessageStore } from './useMessageStore';

const prepareData = () => {
  const result = [];
  for (let i = 0; i < 10; i++) {
    const model = new ModelChat();
    model.fromName = 'name' + i;
    model.sendTime = 'yesterday';
    model.lastMsg = 'lastMsg' + i;
    model.avatar = 'https://p3-passport.byteimg.com/img/user-avatar/a0bc910935bc99ccbbcaa9468245c3ab~100x100.awebp';
    result.push(model);
  }
  return result;
};

export const useChatStore = defineStore("chat", () => {
  const data: Ref<ModelChat[]> = ref(prepareData());
  const selectItem = (item: ModelChat) => {
    if (item.isSelected) {
      return
    }
    data.value.forEach((i) => (i.isSelected = false));
    item.isSelected = true;

    const messageStore = useMessageStore();
    messageStore.initData(item);
  };
  return {
    data,
    selectItem,
  };
});
