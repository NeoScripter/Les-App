import Input from '@/features/profile/components/form/Input';
import type { FC } from 'preact/compat';
import { NewChatHeader, type ChatTabProps } from '../layout/NewChatDialog';

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

                    <Input placeholder="Поиск по нику..." className="mb-2" />
                </label>
                <hr class="text-foreground-muted -mx-(--px) mt-2" />
            </div>
        </>
    );
};

export default CreateContact;
