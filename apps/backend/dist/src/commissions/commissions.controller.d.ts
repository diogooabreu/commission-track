import { CommissionsService } from './commissions.service';
import { CreateCommissionDto } from './dto/create-commission.dto';
import { UpdateCommissionDto } from './dto/update-commission.dto';
export declare class CommissionsController {
    private readonly commissionsService;
    constructor(commissionsService: CommissionsService);
    create(dto: CreateCommissionDto): Promise<{
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
    update(id: string, dto: UpdateCommissionDto): Promise<{
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
