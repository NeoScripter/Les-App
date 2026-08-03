import type { FC } from 'preact/compat';
import { NewChatHeader, type ChatTabProps } from './NewChatDialog';

const SecretChat: FC<ChatTabProps> = ({ currentTab }) => {
    return (
        <>
            <NewChatHeader
                onClick={() => (currentTab.value = 'new_chat')}
                headline="Секретный чат"
            />
            TODO
        </>
    );
};

export default SecretChat;
