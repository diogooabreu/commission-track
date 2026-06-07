import { PrismaService } from '../prisma/prisma.service';
export declare class DeliveriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: {
        fileUrl: string;
        notes?: string;
        commissionId: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        fileUrl: string;
        notes: string | null;
        commissionId: string;
    }>;
    findByCommission(commissionId: string): Promise<{
        id: string;
        createdAt: Date;
        fileUrl: string;
        notes: string | null;
        commissionId: string;
    }[]>;
}
