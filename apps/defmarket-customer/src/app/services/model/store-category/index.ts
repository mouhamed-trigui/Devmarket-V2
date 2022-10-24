import { StoreTypeEnum } from '../../constants';

export interface IStoreCategory {
    id: number;
    name: string;
    description: string;
    storeType: StoreTypeEnum;
}
