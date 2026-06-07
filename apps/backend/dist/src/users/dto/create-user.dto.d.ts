export declare enum Role {
    ARTIST = "ARTIST",
    CLIENT = "CLIENT"
}
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role: Role;
}
