declare const pwned: ({ errorThreshold, messages }?: {
    errorThreshold?: number | undefined;
    messages?: {
        error: string;
        hint: string;
    } | undefined;
}) => (value: string) => Promise<string | {
    validated: string;
    message: string;
} | undefined>;
export default pwned;
