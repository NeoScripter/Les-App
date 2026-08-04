import type { FC } from 'preact/compat';
import { ContactHubHeader, type ChatTabProps } from './ContactHub';

const SecretChat: FC<ChatTabProps> = ({ currentTab }) => {
    return (
        <>
            <ContactHubHeader
                onClick={() => (currentTab.value = 'new_chat')}
                headline="Секретный чат"
            />
            TODO
        </>
    );
};

export default SecretChat;
