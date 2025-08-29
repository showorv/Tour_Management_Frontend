export interface ITour {
    _id: string
    title: string;
    slug: string ; 
    description?: string;
    images: string[];
    location: string;
    costFrom: number;
    startDate: string;
    endDate: string
    departureLocation?: string;
    arrivalLocation?: string;
    included: string[]
    excluded: string[]
    amenities: string[] 
    tourPlan: string[];
    maxGuest: number;
    minAge: number;
    division: string
    tourType: string 
    
}