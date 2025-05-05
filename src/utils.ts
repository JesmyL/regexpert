export const checkIs4xSlashes = (slashes: string | undefined | null) => !!slashes?.length && slashes.length % 4 === 0;
export const checkIs2xSlashes = (slashes: string | undefined | null) => !!slashes?.length && slashes.length % 2 === 0;
