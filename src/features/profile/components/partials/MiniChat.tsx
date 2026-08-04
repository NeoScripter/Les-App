import type { FC } from 'preact/compat';
import { ContactHubHeader, type ChatTabProps } from './ContactHub';

const MiniChat: FC<ChatTabProps> = ({ currentTab }) => {
    return (
        <>
            <ContactHubHeader
                onClick={() => (currentTab.value = 'new_chat')}
                headline="Мини чат"
            />
            TODO
        </>
    );
};

export default MiniChat;
