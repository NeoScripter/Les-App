export type Contact = {
    id: number | string;
    name: string;
    initials: string;
    summary: string;
};

export const contacts: Contact[] = [
    {
        id: 1,
        name: 'Алексей Иванов',
        initials: 'АИ',
        summary: 'Был в сети недавно',
    },
    {
        id: 2,
        name: 'Мария Петрова',
        initials: 'МП',
        summary: 'Набирает сообщение...',
    },
    {
        id: 3,
        name: 'Дмитрий Смирнов',
        initials: 'ДС',
        summary: 'Онлайн',
    },
    {
        id: 4,
        name: 'Елена Козлова',
        initials: 'ЕК',
        summary: 'Записывает голосовое',
    },
    {
        id: 5,
        name: 'Сергей Новиков',
        initials: 'СН',
        summary: 'Был(а) в сети сегодня',
    },
    {
        id: 6,
        name: 'Ольга Морозова',
        initials: 'ОМ',
        summary: 'Отвечает на звонок',
    },
    {
        id: 7,
        name: 'Игорь Соколов',
        initials: 'ИС',
        summary: 'Набирает сообщение...',
    },
    {
        id: 8,
        name: 'Татьяна Кузнецова',
        initials: 'ТК',
        summary: 'В сети',
    },
    {
        id: 9,
        name: 'Андрей Попов',
        initials: 'АП',
        summary: 'Был(а) вчера',
    },
    {
        id: 10,
        name: 'Наталья Лебедева',
        initials: 'НЛ',
        summary: 'Онлайн',
    },
];
