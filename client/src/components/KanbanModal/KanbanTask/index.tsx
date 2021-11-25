import React, { useState } from 'react';
import { KanbanTaskWrapper } from './style';
import { BackLogTaskProps } from '@/types/task';
import { useInput } from '@/lib/hooks';
import { useRecoilValue } from 'recoil';
import { postTask } from '@/lib/api/task';
import userAtom from '@/recoil/user';
import * as avatar from '@/lib/common/avatar';
import { ImageType } from '@/types/image';

const KanbanTask = ({ task, storyId }: { task: BackLogTaskProps; storyId: number }) => {
  const { key, value, onChange } = useInput(task.name);
  const userState = useRecoilValue(userAtom);
  const [isFirstCreate, setFirst] = useState(false);

  const handleInput = async () => {
    if (!value) return;
    if (!isFirstCreate) {
      await postTask(value, 1, storyId, null, userState.currentProjectId);
      setFirst(true);
    }
  };
  return (
    <KanbanTaskWrapper>
      <input value={value} onBlur={handleInput} placeholder={'Type A Task'} onChange={onChange} />
      <p onClick={() => console.log(task)}>
        <img src={avatar[task.userImage as ImageType]} alt="userimage" />
        <span>{task.user}</span>
      </p>
    </KanbanTaskWrapper>
  );
};

export default KanbanTask;
