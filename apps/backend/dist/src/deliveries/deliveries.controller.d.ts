import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
export declare class DeliveriesController {
    private readonly deliveriesService;
    constructor(deliveriesService: DeliveriesService);
    create(dto: CreateDeliveryDto): Promise<{
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
