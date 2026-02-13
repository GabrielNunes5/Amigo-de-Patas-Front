export interface Animal {
    animalId: string;
    animalName: string;
    animalAge: string;
    animalWeight: number;
    animalSex: string;
    animalColor?: string;
    animalSpecies?: string;
    animalVaccines?: string;
    animalSize?: string;
    animalNeutered?: boolean;
    animalSpecialConditions?: string;
    animalImages: string[];
    animalAdopted: boolean;
}

export interface AdocaoFormData {
    animalId: string;
    animalName: string;
    adopterName: string;
    experience?: string;
    otherAnimals?: string;
    message?: string;
}