import { PrismaService } from '../prisma/prisma.service';
export declare class CommissionsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: {
        title: string;
        description: string;
        price: number;
        clientId: string;
        artistId: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        status: import("@prisma/client").$Enums.Status;
        deadline: Date | null;
        clientId: string;
        artistId: string;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        status: import("@prisma/client").$Enums.Status;
        deadline: Date | null;
        clientId: string;
        artistId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        status: import("@prisma/client").$Enums.Status;
        deadline: Date | null;
        clientId: string;
        artistId: string;
    }>;
    update(id: string, dto: Partial<{
        title: string;
        description: string;
        price: number;
    }>): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        status: import("@prisma/client").$Enums.Status;
        deadline: Date | null;
        clientId: string;
        artistId: string;
    }>;
    remove(id: string): Promise<void>;
}
