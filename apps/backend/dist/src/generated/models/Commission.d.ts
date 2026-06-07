import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CommissionModel = runtime.Types.Result.DefaultSelection<Prisma.$CommissionPayload>;
export type AggregateCommission = {
    _count: CommissionCountAggregateOutputType | null;
    _avg: CommissionAvgAggregateOutputType | null;
    _sum: CommissionSumAggregateOutputType | null;
    _min: CommissionMinAggregateOutputType | null;
    _max: CommissionMaxAggregateOutputType | null;
};
export type CommissionAvgAggregateOutputType = {
    price: runtime.Decimal | null;
};
export type CommissionSumAggregateOutputType = {
    price: runtime.Decimal | null;
};
export type CommissionMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    description: string | null;
    price: runtime.Decimal | null;
    status: $Enums.Status | null;
    deadline: Date | null;
    clientId: string | null;
    artistId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CommissionMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    description: string | null;
    price: runtime.Decimal | null;
    status: $Enums.Status | null;
    deadline: Date | null;
    clientId: string | null;
    artistId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CommissionCountAggregateOutputType = {
    id: number;
    title: number;
    description: number;
    price: number;
    status: number;
    deadline: number;
    clientId: number;
    artistId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CommissionAvgAggregateInputType = {
    price?: true;
};
export type CommissionSumAggregateInputType = {
    price?: true;
};
export type CommissionMinAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    price?: true;
    status?: true;
    deadline?: true;
    clientId?: true;
    artistId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CommissionMaxAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    price?: true;
    status?: true;
    deadline?: true;
    clientId?: true;
    artistId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CommissionCountAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    price?: true;
    status?: true;
    deadline?: true;
    clientId?: true;
    artistId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CommissionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommissionWhereInput;
    orderBy?: Prisma.CommissionOrderByWithRelationInput | Prisma.CommissionOrderByWithRelationInput[];
    cursor?: Prisma.CommissionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CommissionCountAggregateInputType;
    _avg?: CommissionAvgAggregateInputType;
    _sum?: CommissionSumAggregateInputType;
    _min?: CommissionMinAggregateInputType;
    _max?: CommissionMaxAggregateInputType;
};
export type GetCommissionAggregateType<T extends CommissionAggregateArgs> = {
    [P in keyof T & keyof AggregateCommission]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCommission[P]> : Prisma.GetScalarType<T[P], AggregateCommission[P]>;
};
export type CommissionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommissionWhereInput;
    orderBy?: Prisma.CommissionOrderByWithAggregationInput | Prisma.CommissionOrderByWithAggregationInput[];
    by: Prisma.CommissionScalarFieldEnum[] | Prisma.CommissionScalarFieldEnum;
    having?: Prisma.CommissionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CommissionCountAggregateInputType | true;
    _avg?: CommissionAvgAggregateInputType;
    _sum?: CommissionSumAggregateInputType;
    _min?: CommissionMinAggregateInputType;
    _max?: CommissionMaxAggregateInputType;
};
export type CommissionGroupByOutputType = {
    id: string;
    title: string;
    description: string;
    price: runtime.Decimal;
    status: $Enums.Status;
    deadline: Date | null;
    clientId: string;
    artistId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: CommissionCountAggregateOutputType | null;
    _avg: CommissionAvgAggregateOutputType | null;
    _sum: CommissionSumAggregateOutputType | null;
    _min: CommissionMinAggregateOutputType | null;
    _max: CommissionMaxAggregateOutputType | null;
};
export type GetCommissionGroupByPayload<T extends CommissionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CommissionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CommissionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CommissionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CommissionGroupByOutputType[P]>;
}>>;
export type CommissionWhereInput = {
    AND?: Prisma.CommissionWhereInput | Prisma.CommissionWhereInput[];
    OR?: Prisma.CommissionWhereInput[];
    NOT?: Prisma.CommissionWhereInput | Prisma.CommissionWhereInput[];
    id?: Prisma.StringFilter<"Commission"> | string;
    title?: Prisma.StringFilter<"Commission"> | string;
    description?: Prisma.StringFilter<"Commission"> | string;
    price?: Prisma.DecimalFilter<"Commission"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusFilter<"Commission"> | $Enums.Status;
    deadline?: Prisma.DateTimeNullableFilter<"Commission"> | Date | string | null;
    clientId?: Prisma.StringFilter<"Commission"> | string;
    artistId?: Prisma.StringFilter<"Commission"> | string;
    createdAt?: Prisma.DateTimeFilter<"Commission"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Commission"> | Date | string;
    client?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    artist?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    deliveries?: Prisma.DeliveryListRelationFilter;
};
export type CommissionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    deadline?: Prisma.SortOrderInput | Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    artistId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    client?: Prisma.UserOrderByWithRelationInput;
    artist?: Prisma.UserOrderByWithRelationInput;
    deliveries?: Prisma.DeliveryOrderByRelationAggregateInput;
};
export type CommissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CommissionWhereInput | Prisma.CommissionWhereInput[];
    OR?: Prisma.CommissionWhereInput[];
    NOT?: Prisma.CommissionWhereInput | Prisma.CommissionWhereInput[];
    title?: Prisma.StringFilter<"Commission"> | string;
    description?: Prisma.StringFilter<"Commission"> | string;
    price?: Prisma.DecimalFilter<"Commission"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusFilter<"Commission"> | $Enums.Status;
    deadline?: Prisma.DateTimeNullableFilter<"Commission"> | Date | string | null;
    clientId?: Prisma.StringFilter<"Commission"> | string;
    artistId?: Prisma.StringFilter<"Commission"> | string;
    createdAt?: Prisma.DateTimeFilter<"Commission"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Commission"> | Date | string;
    client?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    artist?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    deliveries?: Prisma.DeliveryListRelationFilter;
}, "id">;
export type CommissionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    deadline?: Prisma.SortOrderInput | Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    artistId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CommissionCountOrderByAggregateInput;
    _avg?: Prisma.CommissionAvgOrderByAggregateInput;
    _max?: Prisma.CommissionMaxOrderByAggregateInput;
    _min?: Prisma.CommissionMinOrderByAggregateInput;
    _sum?: Prisma.CommissionSumOrderByAggregateInput;
};
export type CommissionScalarWhereWithAggregatesInput = {
    AND?: Prisma.CommissionScalarWhereWithAggregatesInput | Prisma.CommissionScalarWhereWithAggregatesInput[];
    OR?: Prisma.CommissionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CommissionScalarWhereWithAggregatesInput | Prisma.CommissionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Commission"> | string;
    title?: Prisma.StringWithAggregatesFilter<"Commission"> | string;
    description?: Prisma.StringWithAggregatesFilter<"Commission"> | string;
    price?: Prisma.DecimalWithAggregatesFilter<"Commission"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusWithAggregatesFilter<"Commission"> | $Enums.Status;
    deadline?: Prisma.DateTimeNullableWithAggregatesFilter<"Commission"> | Date | string | null;
    clientId?: Prisma.StringWithAggregatesFilter<"Commission"> | string;
    artistId?: Prisma.StringWithAggregatesFilter<"Commission"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Commission"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Commission"> | Date | string;
};
export type CommissionCreateInput = {
    id?: string;
    title: string;
    description: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.Status;
    deadline?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    client: Prisma.UserCreateNestedOneWithoutCommissionsAsClientInput;
    artist: Prisma.UserCreateNestedOneWithoutCommissionsAsArtistInput;
    deliveries?: Prisma.DeliveryCreateNestedManyWithoutCommissionInput;
};
export type CommissionUncheckedCreateInput = {
    id?: string;
    title: string;
    description: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.Status;
    deadline?: Date | string | null;
    clientId: string;
    artistId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deliveries?: Prisma.DeliveryUncheckedCreateNestedManyWithoutCommissionInput;
};
export type CommissionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusFieldUpdateOperationsInput | $Enums.Status;
    deadline?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    client?: Prisma.UserUpdateOneRequiredWithoutCommissionsAsClientNestedInput;
    artist?: Prisma.UserUpdateOneRequiredWithoutCommissionsAsArtistNestedInput;
    deliveries?: Prisma.DeliveryUpdateManyWithoutCommissionNestedInput;
};
export type CommissionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusFieldUpdateOperationsInput | $Enums.Status;
    deadline?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    artistId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deliveries?: Prisma.DeliveryUncheckedUpdateManyWithoutCommissionNestedInput;
};
export type CommissionCreateManyInput = {
    id?: string;
    title: string;
    description: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.Status;
    deadline?: Date | string | null;
    clientId: string;
    artistId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommissionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusFieldUpdateOperationsInput | $Enums.Status;
    deadline?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommissionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusFieldUpdateOperationsInput | $Enums.Status;
    deadline?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    artistId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommissionListRelationFilter = {
    every?: Prisma.CommissionWhereInput;
    some?: Prisma.CommissionWhereInput;
    none?: Prisma.CommissionWhereInput;
};
export type CommissionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CommissionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    deadline?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    artistId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CommissionAvgOrderByAggregateInput = {
    price?: Prisma.SortOrder;
};
export type CommissionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    deadline?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    artistId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CommissionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    deadline?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    artistId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CommissionSumOrderByAggregateInput = {
    price?: Prisma.SortOrder;
};
export type CommissionScalarRelationFilter = {
    is?: Prisma.CommissionWhereInput;
    isNot?: Prisma.CommissionWhereInput;
};
export type CommissionCreateNestedManyWithoutArtistInput = {
    create?: Prisma.XOR<Prisma.CommissionCreateWithoutArtistInput, Prisma.CommissionUncheckedCreateWithoutArtistInput> | Prisma.CommissionCreateWithoutArtistInput[] | Prisma.CommissionUncheckedCreateWithoutArtistInput[];
    connectOrCreate?: Prisma.CommissionCreateOrConnectWithoutArtistInput | Prisma.CommissionCreateOrConnectWithoutArtistInput[];
    createMany?: Prisma.CommissionCreateManyArtistInputEnvelope;
    connect?: Prisma.CommissionWhereUniqueInput | Prisma.CommissionWhereUniqueInput[];
};
export type CommissionCreateNestedManyWithoutClientInput = {
    create?: Prisma.XOR<Prisma.CommissionCreateWithoutClientInput, Prisma.CommissionUncheckedCreateWithoutClientInput> | Prisma.CommissionCreateWithoutClientInput[] | Prisma.CommissionUncheckedCreateWithoutClientInput[];
    connectOrCreate?: Prisma.CommissionCreateOrConnectWithoutClientInput | Prisma.CommissionCreateOrConnectWithoutClientInput[];
    createMany?: Prisma.CommissionCreateManyClientInputEnvelope;
    connect?: Prisma.CommissionWhereUniqueInput | Prisma.CommissionWhereUniqueInput[];
};
export type CommissionUncheckedCreateNestedManyWithoutArtistInput = {
    create?: Prisma.XOR<Prisma.CommissionCreateWithoutArtistInput, Prisma.CommissionUncheckedCreateWithoutArtistInput> | Prisma.CommissionCreateWithoutArtistInput[] | Prisma.CommissionUncheckedCreateWithoutArtistInput[];
    connectOrCreate?: Prisma.CommissionCreateOrConnectWithoutArtistInput | Prisma.CommissionCreateOrConnectWithoutArtistInput[];
    createMany?: Prisma.CommissionCreateManyArtistInputEnvelope;
    connect?: Prisma.CommissionWhereUniqueInput | Prisma.CommissionWhereUniqueInput[];
};
export type CommissionUncheckedCreateNestedManyWithoutClientInput = {
    create?: Prisma.XOR<Prisma.CommissionCreateWithoutClientInput, Prisma.CommissionUncheckedCreateWithoutClientInput> | Prisma.CommissionCreateWithoutClientInput[] | Prisma.CommissionUncheckedCreateWithoutClientInput[];
    connectOrCreate?: Prisma.CommissionCreateOrConnectWithoutClientInput | Prisma.CommissionCreateOrConnectWithoutClientInput[];
    createMany?: Prisma.CommissionCreateManyClientInputEnvelope;
    connect?: Prisma.CommissionWhereUniqueInput | Prisma.CommissionWhereUniqueInput[];
};
export type CommissionUpdateManyWithoutArtistNestedInput = {
    create?: Prisma.XOR<Prisma.CommissionCreateWithoutArtistInput, Prisma.CommissionUncheckedCreateWithoutArtistInput> | Prisma.CommissionCreateWithoutArtistInput[] | Prisma.CommissionUncheckedCreateWithoutArtistInput[];
    connectOrCreate?: Prisma.CommissionCreateOrConnectWithoutArtistInput | Prisma.CommissionCreateOrConnectWithoutArtistInput[];
    upsert?: Prisma.CommissionUpsertWithWhereUniqueWithoutArtistInput | Prisma.CommissionUpsertWithWhereUniqueWithoutArtistInput[];
    createMany?: Prisma.CommissionCreateManyArtistInputEnvelope;
    set?: Prisma.CommissionWhereUniqueInput | Prisma.CommissionWhereUniqueInput[];
    disconnect?: Prisma.CommissionWhereUniqueInput | Prisma.CommissionWhereUniqueInput[];
    delete?: Prisma.CommissionWhereUniqueInput | Prisma.CommissionWhereUniqueInput[];
    connect?: Prisma.CommissionWhereUniqueInput | Prisma.CommissionWhereUniqueInput[];
    update?: Prisma.CommissionUpdateWithWhereUniqueWithoutArtistInput | Prisma.CommissionUpdateWithWhereUniqueWithoutArtistInput[];
    updateMany?: Prisma.CommissionUpdateManyWithWhereWithoutArtistInput | Prisma.CommissionUpdateManyWithWhereWithoutArtistInput[];
    deleteMany?: Prisma.CommissionScalarWhereInput | Prisma.CommissionScalarWhereInput[];
};
export type CommissionUpdateManyWithoutClientNestedInput = {
    create?: Prisma.XOR<Prisma.CommissionCreateWithoutClientInput, Prisma.CommissionUncheckedCreateWithoutClientInput> | Prisma.CommissionCreateWithoutClientInput[] | Prisma.CommissionUncheckedCreateWithoutClientInput[];
    connectOrCreate?: Prisma.CommissionCreateOrConnectWithoutClientInput | Prisma.CommissionCreateOrConnectWithoutClientInput[];
    upsert?: Prisma.CommissionUpsertWithWhereUniqueWithoutClientInput | Prisma.CommissionUpsertWithWhereUniqueWithoutClientInput[];
    createMany?: Prisma.CommissionCreateManyClientInputEnvelope;
    set?: Prisma.CommissionWhereUniqueInput | Prisma.CommissionWhereUniqueInput[];
    disconnect?: Prisma.CommissionWhereUniqueInput | Prisma.CommissionWhereUniqueInput[];
    delete?: Prisma.CommissionWhereUniqueInput | Prisma.CommissionWhereUniqueInput[];
    connect?: Prisma.CommissionWhereUniqueInput | Prisma.CommissionWhereUniqueInput[];
    update?: Prisma.CommissionUpdateWithWhereUniqueWithoutClientInput | Prisma.CommissionUpdateWithWhereUniqueWithoutClientInput[];
    updateMany?: Prisma.CommissionUpdateManyWithWhereWithoutClientInput | Prisma.CommissionUpdateManyWithWhereWithoutClientInput[];
    deleteMany?: Prisma.CommissionScalarWhereInput | Prisma.CommissionScalarWhereInput[];
};
export type CommissionUncheckedUpdateManyWithoutArtistNestedInput = {
    create?: Prisma.XOR<Prisma.CommissionCreateWithoutArtistInput, Prisma.CommissionUncheckedCreateWithoutArtistInput> | Prisma.CommissionCreateWithoutArtistInput[] | Prisma.CommissionUncheckedCreateWithoutArtistInput[];
    connectOrCreate?: Prisma.CommissionCreateOrConnectWithoutArtistInput | Prisma.CommissionCreateOrConnectWithoutArtistInput[];
    upsert?: Prisma.CommissionUpsertWithWhereUniqueWithoutArtistInput | Prisma.CommissionUpsertWithWhereUniqueWithoutArtistInput[];
    createMany?: Prisma.CommissionCreateManyArtistInputEnvelope;
    set?: Prisma.CommissionWhereUniqueInput | Prisma.CommissionWhereUniqueInput[];
    disconnect?: Prisma.CommissionWhereUniqueInput | Prisma.CommissionWhereUniqueInput[];
    delete?: Prisma.CommissionWhereUniqueInput | Prisma.CommissionWhereUniqueInput[];
    connect?: Prisma.CommissionWhereUniqueInput | Prisma.CommissionWhereUniqueInput[];
    update?: Prisma.CommissionUpdateWithWhereUniqueWithoutArtistInput | Prisma.CommissionUpdateWithWhereUniqueWithoutArtistInput[];
    updateMany?: Prisma.CommissionUpdateManyWithWhereWithoutArtistInput | Prisma.CommissionUpdateManyWithWhereWithoutArtistInput[];
    deleteMany?: Prisma.CommissionScalarWhereInput | Prisma.CommissionScalarWhereInput[];
};
export type CommissionUncheckedUpdateManyWithoutClientNestedInput = {
    create?: Prisma.XOR<Prisma.CommissionCreateWithoutClientInput, Prisma.CommissionUncheckedCreateWithoutClientInput> | Prisma.CommissionCreateWithoutClientInput[] | Prisma.CommissionUncheckedCreateWithoutClientInput[];
    connectOrCreate?: Prisma.CommissionCreateOrConnectWithoutClientInput | Prisma.CommissionCreateOrConnectWithoutClientInput[];
    upsert?: Prisma.CommissionUpsertWithWhereUniqueWithoutClientInput | Prisma.CommissionUpsertWithWhereUniqueWithoutClientInput[];
    createMany?: Prisma.CommissionCreateManyClientInputEnvelope;
    set?: Prisma.CommissionWhereUniqueInput | Prisma.CommissionWhereUniqueInput[];
    disconnect?: Prisma.CommissionWhereUniqueInput | Prisma.CommissionWhereUniqueInput[];
    delete?: Prisma.CommissionWhereUniqueInput | Prisma.CommissionWhereUniqueInput[];
    connect?: Prisma.CommissionWhereUniqueInput | Prisma.CommissionWhereUniqueInput[];
    update?: Prisma.CommissionUpdateWithWhereUniqueWithoutClientInput | Prisma.CommissionUpdateWithWhereUniqueWithoutClientInput[];
    updateMany?: Prisma.CommissionUpdateManyWithWhereWithoutClientInput | Prisma.CommissionUpdateManyWithWhereWithoutClientInput[];
    deleteMany?: Prisma.CommissionScalarWhereInput | Prisma.CommissionScalarWhereInput[];
};
export type DecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type EnumStatusFieldUpdateOperationsInput = {
    set?: $Enums.Status;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type CommissionCreateNestedOneWithoutDeliveriesInput = {
    create?: Prisma.XOR<Prisma.CommissionCreateWithoutDeliveriesInput, Prisma.CommissionUncheckedCreateWithoutDeliveriesInput>;
    connectOrCreate?: Prisma.CommissionCreateOrConnectWithoutDeliveriesInput;
    connect?: Prisma.CommissionWhereUniqueInput;
};
export type CommissionUpdateOneRequiredWithoutDeliveriesNestedInput = {
    create?: Prisma.XOR<Prisma.CommissionCreateWithoutDeliveriesInput, Prisma.CommissionUncheckedCreateWithoutDeliveriesInput>;
    connectOrCreate?: Prisma.CommissionCreateOrConnectWithoutDeliveriesInput;
    upsert?: Prisma.CommissionUpsertWithoutDeliveriesInput;
    connect?: Prisma.CommissionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CommissionUpdateToOneWithWhereWithoutDeliveriesInput, Prisma.CommissionUpdateWithoutDeliveriesInput>, Prisma.CommissionUncheckedUpdateWithoutDeliveriesInput>;
};
export type CommissionCreateWithoutArtistInput = {
    id?: string;
    title: string;
    description: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.Status;
    deadline?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    client: Prisma.UserCreateNestedOneWithoutCommissionsAsClientInput;
    deliveries?: Prisma.DeliveryCreateNestedManyWithoutCommissionInput;
};
export type CommissionUncheckedCreateWithoutArtistInput = {
    id?: string;
    title: string;
    description: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.Status;
    deadline?: Date | string | null;
    clientId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deliveries?: Prisma.DeliveryUncheckedCreateNestedManyWithoutCommissionInput;
};
export type CommissionCreateOrConnectWithoutArtistInput = {
    where: Prisma.CommissionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommissionCreateWithoutArtistInput, Prisma.CommissionUncheckedCreateWithoutArtistInput>;
};
export type CommissionCreateManyArtistInputEnvelope = {
    data: Prisma.CommissionCreateManyArtistInput | Prisma.CommissionCreateManyArtistInput[];
    skipDuplicates?: boolean;
};
export type CommissionCreateWithoutClientInput = {
    id?: string;
    title: string;
    description: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.Status;
    deadline?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    artist: Prisma.UserCreateNestedOneWithoutCommissionsAsArtistInput;
    deliveries?: Prisma.DeliveryCreateNestedManyWithoutCommissionInput;
};
export type CommissionUncheckedCreateWithoutClientInput = {
    id?: string;
    title: string;
    description: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.Status;
    deadline?: Date | string | null;
    artistId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deliveries?: Prisma.DeliveryUncheckedCreateNestedManyWithoutCommissionInput;
};
export type CommissionCreateOrConnectWithoutClientInput = {
    where: Prisma.CommissionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommissionCreateWithoutClientInput, Prisma.CommissionUncheckedCreateWithoutClientInput>;
};
export type CommissionCreateManyClientInputEnvelope = {
    data: Prisma.CommissionCreateManyClientInput | Prisma.CommissionCreateManyClientInput[];
    skipDuplicates?: boolean;
};
export type CommissionUpsertWithWhereUniqueWithoutArtistInput = {
    where: Prisma.CommissionWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommissionUpdateWithoutArtistInput, Prisma.CommissionUncheckedUpdateWithoutArtistInput>;
    create: Prisma.XOR<Prisma.CommissionCreateWithoutArtistInput, Prisma.CommissionUncheckedCreateWithoutArtistInput>;
};
export type CommissionUpdateWithWhereUniqueWithoutArtistInput = {
    where: Prisma.CommissionWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommissionUpdateWithoutArtistInput, Prisma.CommissionUncheckedUpdateWithoutArtistInput>;
};
export type CommissionUpdateManyWithWhereWithoutArtistInput = {
    where: Prisma.CommissionScalarWhereInput;
    data: Prisma.XOR<Prisma.CommissionUpdateManyMutationInput, Prisma.CommissionUncheckedUpdateManyWithoutArtistInput>;
};
export type CommissionScalarWhereInput = {
    AND?: Prisma.CommissionScalarWhereInput | Prisma.CommissionScalarWhereInput[];
    OR?: Prisma.CommissionScalarWhereInput[];
    NOT?: Prisma.CommissionScalarWhereInput | Prisma.CommissionScalarWhereInput[];
    id?: Prisma.StringFilter<"Commission"> | string;
    title?: Prisma.StringFilter<"Commission"> | string;
    description?: Prisma.StringFilter<"Commission"> | string;
    price?: Prisma.DecimalFilter<"Commission"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusFilter<"Commission"> | $Enums.Status;
    deadline?: Prisma.DateTimeNullableFilter<"Commission"> | Date | string | null;
    clientId?: Prisma.StringFilter<"Commission"> | string;
    artistId?: Prisma.StringFilter<"Commission"> | string;
    createdAt?: Prisma.DateTimeFilter<"Commission"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Commission"> | Date | string;
};
export type CommissionUpsertWithWhereUniqueWithoutClientInput = {
    where: Prisma.CommissionWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommissionUpdateWithoutClientInput, Prisma.CommissionUncheckedUpdateWithoutClientInput>;
    create: Prisma.XOR<Prisma.CommissionCreateWithoutClientInput, Prisma.CommissionUncheckedCreateWithoutClientInput>;
};
export type CommissionUpdateWithWhereUniqueWithoutClientInput = {
    where: Prisma.CommissionWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommissionUpdateWithoutClientInput, Prisma.CommissionUncheckedUpdateWithoutClientInput>;
};
export type CommissionUpdateManyWithWhereWithoutClientInput = {
    where: Prisma.CommissionScalarWhereInput;
    data: Prisma.XOR<Prisma.CommissionUpdateManyMutationInput, Prisma.CommissionUncheckedUpdateManyWithoutClientInput>;
};
export type CommissionCreateWithoutDeliveriesInput = {
    id?: string;
    title: string;
    description: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.Status;
    deadline?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    client: Prisma.UserCreateNestedOneWithoutCommissionsAsClientInput;
    artist: Prisma.UserCreateNestedOneWithoutCommissionsAsArtistInput;
};
export type CommissionUncheckedCreateWithoutDeliveriesInput = {
    id?: string;
    title: string;
    description: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.Status;
    deadline?: Date | string | null;
    clientId: string;
    artistId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommissionCreateOrConnectWithoutDeliveriesInput = {
    where: Prisma.CommissionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommissionCreateWithoutDeliveriesInput, Prisma.CommissionUncheckedCreateWithoutDeliveriesInput>;
};
export type CommissionUpsertWithoutDeliveriesInput = {
    update: Prisma.XOR<Prisma.CommissionUpdateWithoutDeliveriesInput, Prisma.CommissionUncheckedUpdateWithoutDeliveriesInput>;
    create: Prisma.XOR<Prisma.CommissionCreateWithoutDeliveriesInput, Prisma.CommissionUncheckedCreateWithoutDeliveriesInput>;
    where?: Prisma.CommissionWhereInput;
};
export type CommissionUpdateToOneWithWhereWithoutDeliveriesInput = {
    where?: Prisma.CommissionWhereInput;
    data: Prisma.XOR<Prisma.CommissionUpdateWithoutDeliveriesInput, Prisma.CommissionUncheckedUpdateWithoutDeliveriesInput>;
};
export type CommissionUpdateWithoutDeliveriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusFieldUpdateOperationsInput | $Enums.Status;
    deadline?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    client?: Prisma.UserUpdateOneRequiredWithoutCommissionsAsClientNestedInput;
    artist?: Prisma.UserUpdateOneRequiredWithoutCommissionsAsArtistNestedInput;
};
export type CommissionUncheckedUpdateWithoutDeliveriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusFieldUpdateOperationsInput | $Enums.Status;
    deadline?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    artistId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommissionCreateManyArtistInput = {
    id?: string;
    title: string;
    description: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.Status;
    deadline?: Date | string | null;
    clientId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommissionCreateManyClientInput = {
    id?: string;
    title: string;
    description: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.Status;
    deadline?: Date | string | null;
    artistId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommissionUpdateWithoutArtistInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusFieldUpdateOperationsInput | $Enums.Status;
    deadline?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    client?: Prisma.UserUpdateOneRequiredWithoutCommissionsAsClientNestedInput;
    deliveries?: Prisma.DeliveryUpdateManyWithoutCommissionNestedInput;
};
export type CommissionUncheckedUpdateWithoutArtistInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusFieldUpdateOperationsInput | $Enums.Status;
    deadline?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deliveries?: Prisma.DeliveryUncheckedUpdateManyWithoutCommissionNestedInput;
};
export type CommissionUncheckedUpdateManyWithoutArtistInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusFieldUpdateOperationsInput | $Enums.Status;
    deadline?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommissionUpdateWithoutClientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusFieldUpdateOperationsInput | $Enums.Status;
    deadline?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    artist?: Prisma.UserUpdateOneRequiredWithoutCommissionsAsArtistNestedInput;
    deliveries?: Prisma.DeliveryUpdateManyWithoutCommissionNestedInput;
};
export type CommissionUncheckedUpdateWithoutClientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusFieldUpdateOperationsInput | $Enums.Status;
    deadline?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    artistId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deliveries?: Prisma.DeliveryUncheckedUpdateManyWithoutCommissionNestedInput;
};
export type CommissionUncheckedUpdateManyWithoutClientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusFieldUpdateOperationsInput | $Enums.Status;
    deadline?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    artistId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommissionCountOutputType = {
    deliveries: number;
};
export type CommissionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    deliveries?: boolean | CommissionCountOutputTypeCountDeliveriesArgs;
};
export type CommissionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommissionCountOutputTypeSelect<ExtArgs> | null;
};
export type CommissionCountOutputTypeCountDeliveriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DeliveryWhereInput;
};
export type CommissionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    price?: boolean;
    status?: boolean;
    deadline?: boolean;
    clientId?: boolean;
    artistId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    client?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    artist?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    deliveries?: boolean | Prisma.Commission$deliveriesArgs<ExtArgs>;
    _count?: boolean | Prisma.CommissionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["commission"]>;
export type CommissionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    price?: boolean;
    status?: boolean;
    deadline?: boolean;
    clientId?: boolean;
    artistId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    client?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    artist?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["commission"]>;
export type CommissionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    price?: boolean;
    status?: boolean;
    deadline?: boolean;
    clientId?: boolean;
    artistId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    client?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    artist?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["commission"]>;
export type CommissionSelectScalar = {
    id?: boolean;
    title?: boolean;
    description?: boolean;
    price?: boolean;
    status?: boolean;
    deadline?: boolean;
    clientId?: boolean;
    artistId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CommissionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "description" | "price" | "status" | "deadline" | "clientId" | "artistId" | "createdAt" | "updatedAt", ExtArgs["result"]["commission"]>;
export type CommissionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    client?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    artist?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    deliveries?: boolean | Prisma.Commission$deliveriesArgs<ExtArgs>;
    _count?: boolean | Prisma.CommissionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type CommissionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    client?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    artist?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type CommissionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    client?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    artist?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $CommissionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Commission";
    objects: {
        client: Prisma.$UserPayload<ExtArgs>;
        artist: Prisma.$UserPayload<ExtArgs>;
        deliveries: Prisma.$DeliveryPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        title: string;
        description: string;
        price: runtime.Decimal;
        status: $Enums.Status;
        deadline: Date | null;
        clientId: string;
        artistId: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["commission"]>;
    composites: {};
};
export type CommissionGetPayload<S extends boolean | null | undefined | CommissionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CommissionPayload, S>;
export type CommissionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CommissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CommissionCountAggregateInputType | true;
};
export interface CommissionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Commission'];
        meta: {
            name: 'Commission';
        };
    };
    findUnique<T extends CommissionFindUniqueArgs>(args: Prisma.SelectSubset<T, CommissionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CommissionClient<runtime.Types.Result.GetResult<Prisma.$CommissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CommissionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CommissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommissionClient<runtime.Types.Result.GetResult<Prisma.$CommissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CommissionFindFirstArgs>(args?: Prisma.SelectSubset<T, CommissionFindFirstArgs<ExtArgs>>): Prisma.Prisma__CommissionClient<runtime.Types.Result.GetResult<Prisma.$CommissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CommissionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CommissionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommissionClient<runtime.Types.Result.GetResult<Prisma.$CommissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CommissionFindManyArgs>(args?: Prisma.SelectSubset<T, CommissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CommissionCreateArgs>(args: Prisma.SelectSubset<T, CommissionCreateArgs<ExtArgs>>): Prisma.Prisma__CommissionClient<runtime.Types.Result.GetResult<Prisma.$CommissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CommissionCreateManyArgs>(args?: Prisma.SelectSubset<T, CommissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CommissionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CommissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CommissionDeleteArgs>(args: Prisma.SelectSubset<T, CommissionDeleteArgs<ExtArgs>>): Prisma.Prisma__CommissionClient<runtime.Types.Result.GetResult<Prisma.$CommissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CommissionUpdateArgs>(args: Prisma.SelectSubset<T, CommissionUpdateArgs<ExtArgs>>): Prisma.Prisma__CommissionClient<runtime.Types.Result.GetResult<Prisma.$CommissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CommissionDeleteManyArgs>(args?: Prisma.SelectSubset<T, CommissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CommissionUpdateManyArgs>(args: Prisma.SelectSubset<T, CommissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CommissionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CommissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CommissionUpsertArgs>(args: Prisma.SelectSubset<T, CommissionUpsertArgs<ExtArgs>>): Prisma.Prisma__CommissionClient<runtime.Types.Result.GetResult<Prisma.$CommissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CommissionCountArgs>(args?: Prisma.Subset<T, CommissionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CommissionCountAggregateOutputType> : number>;
    aggregate<T extends CommissionAggregateArgs>(args: Prisma.Subset<T, CommissionAggregateArgs>): Prisma.PrismaPromise<GetCommissionAggregateType<T>>;
    groupBy<T extends CommissionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CommissionGroupByArgs['orderBy'];
    } : {
        orderBy?: CommissionGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CommissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CommissionFieldRefs;
}
export interface Prisma__CommissionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    client<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    artist<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    deliveries<T extends Prisma.Commission$deliveriesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Commission$deliveriesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CommissionFieldRefs {
    readonly id: Prisma.FieldRef<"Commission", 'String'>;
    readonly title: Prisma.FieldRef<"Commission", 'String'>;
    readonly description: Prisma.FieldRef<"Commission", 'String'>;
    readonly price: Prisma.FieldRef<"Commission", 'Decimal'>;
    readonly status: Prisma.FieldRef<"Commission", 'Status'>;
    readonly deadline: Prisma.FieldRef<"Commission", 'DateTime'>;
    readonly clientId: Prisma.FieldRef<"Commission", 'String'>;
    readonly artistId: Prisma.FieldRef<"Commission", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Commission", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Commission", 'DateTime'>;
}
export type CommissionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommissionSelect<ExtArgs> | null;
    omit?: Prisma.CommissionOmit<ExtArgs> | null;
    include?: Prisma.CommissionInclude<ExtArgs> | null;
    where: Prisma.CommissionWhereUniqueInput;
};
export type CommissionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommissionSelect<ExtArgs> | null;
    omit?: Prisma.CommissionOmit<ExtArgs> | null;
    include?: Prisma.CommissionInclude<ExtArgs> | null;
    where: Prisma.CommissionWhereUniqueInput;
};
export type CommissionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommissionSelect<ExtArgs> | null;
    omit?: Prisma.CommissionOmit<ExtArgs> | null;
    include?: Prisma.CommissionInclude<ExtArgs> | null;
    where?: Prisma.CommissionWhereInput;
    orderBy?: Prisma.CommissionOrderByWithRelationInput | Prisma.CommissionOrderByWithRelationInput[];
    cursor?: Prisma.CommissionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommissionScalarFieldEnum | Prisma.CommissionScalarFieldEnum[];
};
export type CommissionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommissionSelect<ExtArgs> | null;
    omit?: Prisma.CommissionOmit<ExtArgs> | null;
    include?: Prisma.CommissionInclude<ExtArgs> | null;
    where?: Prisma.CommissionWhereInput;
    orderBy?: Prisma.CommissionOrderByWithRelationInput | Prisma.CommissionOrderByWithRelationInput[];
    cursor?: Prisma.CommissionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommissionScalarFieldEnum | Prisma.CommissionScalarFieldEnum[];
};
export type CommissionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommissionSelect<ExtArgs> | null;
    omit?: Prisma.CommissionOmit<ExtArgs> | null;
    include?: Prisma.CommissionInclude<ExtArgs> | null;
    where?: Prisma.CommissionWhereInput;
    orderBy?: Prisma.CommissionOrderByWithRelationInput | Prisma.CommissionOrderByWithRelationInput[];
    cursor?: Prisma.CommissionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommissionScalarFieldEnum | Prisma.CommissionScalarFieldEnum[];
};
export type CommissionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommissionSelect<ExtArgs> | null;
    omit?: Prisma.CommissionOmit<ExtArgs> | null;
    include?: Prisma.CommissionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommissionCreateInput, Prisma.CommissionUncheckedCreateInput>;
};
export type CommissionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CommissionCreateManyInput | Prisma.CommissionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CommissionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommissionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommissionOmit<ExtArgs> | null;
    data: Prisma.CommissionCreateManyInput | Prisma.CommissionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CommissionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CommissionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommissionSelect<ExtArgs> | null;
    omit?: Prisma.CommissionOmit<ExtArgs> | null;
    include?: Prisma.CommissionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommissionUpdateInput, Prisma.CommissionUncheckedUpdateInput>;
    where: Prisma.CommissionWhereUniqueInput;
};
export type CommissionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CommissionUpdateManyMutationInput, Prisma.CommissionUncheckedUpdateManyInput>;
    where?: Prisma.CommissionWhereInput;
    limit?: number;
};
export type CommissionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommissionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommissionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommissionUpdateManyMutationInput, Prisma.CommissionUncheckedUpdateManyInput>;
    where?: Prisma.CommissionWhereInput;
    limit?: number;
    include?: Prisma.CommissionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CommissionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommissionSelect<ExtArgs> | null;
    omit?: Prisma.CommissionOmit<ExtArgs> | null;
    include?: Prisma.CommissionInclude<ExtArgs> | null;
    where: Prisma.CommissionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommissionCreateInput, Prisma.CommissionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CommissionUpdateInput, Prisma.CommissionUncheckedUpdateInput>;
};
export type CommissionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommissionSelect<ExtArgs> | null;
    omit?: Prisma.CommissionOmit<ExtArgs> | null;
    include?: Prisma.CommissionInclude<ExtArgs> | null;
    where: Prisma.CommissionWhereUniqueInput;
};
export type CommissionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommissionWhereInput;
    limit?: number;
};
export type Commission$deliveriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliverySelect<ExtArgs> | null;
    omit?: Prisma.DeliveryOmit<ExtArgs> | null;
    include?: Prisma.DeliveryInclude<ExtArgs> | null;
    where?: Prisma.DeliveryWhereInput;
    orderBy?: Prisma.DeliveryOrderByWithRelationInput | Prisma.DeliveryOrderByWithRelationInput[];
    cursor?: Prisma.DeliveryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DeliveryScalarFieldEnum | Prisma.DeliveryScalarFieldEnum[];
};
export type CommissionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommissionSelect<ExtArgs> | null;
    omit?: Prisma.CommissionOmit<ExtArgs> | null;
    include?: Prisma.CommissionInclude<ExtArgs> | null;
};
