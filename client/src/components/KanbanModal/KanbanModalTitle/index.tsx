import React from 'react';
import KanbanModalTitleWrapper from './style';
import { useInput } from '@/lib/hooks';
import { StoryType } from '@/types/story';
import { useSetRecoilState } from 'recoil';
import { updateStoryWithId } from '@/lib/api/story';
import storyListAtom from '@/recoil/story';
import { useSocketSend } from '@/lib/hooks';
import producer from 'immer';

const KanbanModalTitle = ({ story }: { story: StoryType }) => {
  const { value, onChange } = useInput(story?.name);
  const setStoryListState = useSetRecoilState(storyListAtom);
  const emitUpdateStory = useSocketSend('UPDATE_STORY');

  const handleInputChange = async () => {
    setStoryListState((prev) =>
      producer(prev, (draft) => [
        ...draft.filter((v) => v.id !== story.id),
        { ...story, name: value },
      ]),
    );
    await updateStoryWithId({ ...story, name: value });
    emitUpdateStory(story.id);
  };

  return (
    <KanbanModalTitleWrapper>
      <input
        type="text"
        value={value}
        placeholder={'클릭 후 스토리를 작성하세요'}
        onBlur={() => handleInputChange()}
        onChange={onChange}
      />
    </KanbanModalTitleWrapper>
  );
};

export default KanbanModalTitle;
