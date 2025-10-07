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
    animalImageUrl: string;
    animalAdopted: boolean;
}

export interface AdocaoFormData {
    animal_id: string;
    animal_name: string;
    experiencia_animais: string;
    outros_animais: string;
    mensagem: string;
}