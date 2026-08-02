import ChatListPanel from './partials/ChatListPanel';
import ChatWindow from './partials/ChatWindow';

const Profile = () => {
    return (
        <main className="flex h-full gap-2 p-2 sm:gap-4 sm:p-4">
            <ChatListPanel />

            <ChatWindow />
        </main>
    );
};

export default Profile;
