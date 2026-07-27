import type { FC } from 'preact/compat';
import { NewChatHeader, type ChatTabProps } from '../layout/NewChatDialog';

const MiniChat: FC<ChatTabProps> = ({ currentTab }) => {
    return (
        <>
            <NewChatHeader
                onClick={() => (currentTab.value = 'new_chat')}
                headline="Мини чат"
            />
            TODO
        </>
    );
};

export default MiniChat;
