type Color = {
    color: string;
    backgroundColor: string;
};

const colors: Color[] = [
    {
        color: '#fff',
        backgroundColor: 'rgb(168 85 247 / 1)',
    },
    {
        color: '#fff',
        backgroundColor: 'rgb(59 130 246 / 1)',
    },
    {
        color: '#fff',
        backgroundColor: 'rgb(236 72 153 / 1)',
    },
    {
        color: '#000',
        backgroundColor: 'rgb(177 255 29 / 1)',
    },
    {
        color: '#000',
        backgroundColor: 'rgb(255 116 1 / 1)',
    },
];

export default function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}
