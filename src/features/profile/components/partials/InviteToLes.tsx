import type { FC } from 'preact/compat';
import { NewChatHeader, type ChatTabProps } from './NewChatDialog';

const InviteToLes: FC<ChatTabProps> = ({ currentTab }) => {
    return (
        <>
            <NewChatHeader
                onClick={() => (currentTab.value = 'new_chat')}
                headline="Пригласить в /les"
            />
            TODO
        </>
    );
};

export default InviteToLes;
