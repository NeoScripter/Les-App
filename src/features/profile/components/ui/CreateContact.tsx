import type { FC } from 'preact/compat';
import { NewChatHeader, type ChatTabProps } from '../layout/NewChatDialog';

const CreateContact: FC<ChatTabProps> = ({ currentTab }) => {
    return (
        <>
            <NewChatHeader
                onClick={() => (currentTab.value = 'new_chat')}
                headline="Создать контакт"
            />
            TODO
        </>
    );
};

export default CreateContact;
