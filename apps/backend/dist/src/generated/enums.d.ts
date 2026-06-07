export declare const Role: {
    readonly ARTIST: "ARTIST";
    readonly CLIENT: "CLIENT";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const Status: {
    readonly PENDING: "PENDING";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly WAITING_PAYMENT: "WAITING_PAYMENT";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
};
export type Status = (typeof Status)[keyof typeof Status];
