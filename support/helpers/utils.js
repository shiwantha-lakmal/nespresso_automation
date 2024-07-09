export const randomString = (length) => [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join('');

export const capitalizeString = (string) => string[0].toUpperCase() + string.toLowerCase().slice(1);

export const utcTimestamp = () => new Date().toISOString() + ' -- ';
