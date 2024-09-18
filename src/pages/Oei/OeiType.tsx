export interface FilterOptions {
    headerFilters: {
        GeoLocation: { value: number; label: string }[];
        Function: { value: number; label: string }[];
        Process: { value: number; label: string }[];
        Asset: { value: number; label: string }[];
    };
    fromDate: string;
    toDate: string;
}

export interface FilterOptionsProps {
    GeoLocation: { value: number; label: string }[];
    Function: { value: number; label: string }[];
    Process: { value: number; label: string }[];
    Asset: { value: number; label: string }[];
}
