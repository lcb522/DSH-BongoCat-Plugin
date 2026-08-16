/** Cordis companion plugin name. */
export declare const name: string;
/** Service required before the companion can reserve package ownership. */
export declare const inject: string[];
/** Register this package's invariant companion. */
export declare const apply: (ctx: unknown) => Promise<() => void>;
