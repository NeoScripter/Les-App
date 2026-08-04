import type { FC } from 'preact/compat';
import { ContactHubHeader, type ChatTabProps } from './ContactHub';

const InviteToLes: FC<ChatTabProps> = ({ currentTab }) => {
    return (
        <>
            <ContactHubHeader
                onClick={() => (currentTab.value = 'new_chat')}
                headline="Пригласить в /les"
            />
            TODO
        </>
    );
};

export default InviteToLes;
