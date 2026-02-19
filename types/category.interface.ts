export interface IMeasurement {
    id: string;
    name: string;
    clothCategoryId: string;
    createdAt: string;
    updatedAt: string;
}

export interface IClothCategory {
    id: string;
    name: string;
    image: string | null;
    tailorId: string;
    createdAt: string;
    updatedAt: string;
    measurements: IMeasurement[];
}

export interface IClothCategoryTable {
    id: string;
    name: string;
    tailorId: string;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    measurements: IMeasurement[];
}

export interface CategoryPayload {
    name: string;
    mesurments: { name: string }[];
    file?: File;
}

export interface IEditMeasurement {
    id?: string;
    name: string;
}


export interface IEditClothCategory {
    id: string;
    name: string;
    measurements: IEditMeasurement[];
    file?: File;
}

export interface IEditCategoryPayload {
    name: string;
    measurements: { id?: string; name: string }[];
    file?: File; // single file, optional
}
