type Styles = {
    color: string;
    backgroundColor: string;
    hasBorder: boolean;
};

const styles: Styles[] = [
    {
        color: '#fff',
        backgroundColor: 'oklch(0.63 0.233 304 / 1)',
        hasBorder: false,
    },
    {
        color: '#fff',
        backgroundColor: 'oklch(0.63 0.186 260 / 1)',
        hasBorder: true,
    },
    {
        color: '#fff',
        backgroundColor: 'oklch(0.65 0.213 354 / 1)',
        hasBorder: false,
    },
    {
        color: '#000',
        backgroundColor: 'oklch(0.91 0.237 129 / 1)',
        hasBorder: false,
    },
    {
        color: '#000',
        backgroundColor: 'oklch(0.71 0.195 48 / 1)',
        hasBorder: false,
    },
    {
        color: '#000',
        backgroundColor: 'oklch(0.71 0.195 48 / 1)',
        hasBorder: true,
    },
    {
        color: '#000',
        backgroundColor: 'rgb(232 255 138 / 1)',
        hasBorder: false,
    },
];

export default function getAvatarStyle() {
    const index = Math.floor(Math.random() * styles.length);
    return styles[index];
}
