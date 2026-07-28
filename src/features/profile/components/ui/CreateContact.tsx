import type { FC } from 'preact/compat';
import { NewChatHeader, type ChatTabProps } from '../layout/NewChatDialog';
import SearchInput from './SearchInput';

const CreateContact: FC<ChatTabProps> = ({ currentTab }) => {
    return (
        <>
            <NewChatHeader
                onClick={() => (currentTab.value = 'new_chat')}
                headline="Создать контакт"
            />
            <div>
                <label>
                    <p class="text-foreground/50 font-medium">Контакты</p>

                    <SearchInput placeholder="Поиск по нику..." />
                    <SearchInput placeholder="Поиск по нику..." />
                    <SearchInput placeholder="Поиск по нику..." />
                </label>
                <hr class="text-foreground-muted -mx-(--px) mt-2" />
            </div>
        </>
    );
};

export default CreateContact;
