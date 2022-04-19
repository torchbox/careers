export const pluralize = (count: number, noun: string, nounSuffix = 's') =>
    `${count !== 1 ? noun + nounSuffix : noun}`;
