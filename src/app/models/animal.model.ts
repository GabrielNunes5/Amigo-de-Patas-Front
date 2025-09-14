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
    nome_interessado: string;
    email: string;
    telefone: string;
    tipo_moradia: string;
    tem_quintal: boolean;
    experiencia_animais: string;
    outros_animais: string;
    mensagem: string;
}