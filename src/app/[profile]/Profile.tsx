import ChatListPanel from './partials/ChatListPanel';
import ChatWindow from './partials/ChatWindow';

const Profile = () => {
    return (
        <main className="flex h-full items-start">
            <ChatListPanel />

            <ChatWindow />
        </main>
    );
};

export default Profile;
