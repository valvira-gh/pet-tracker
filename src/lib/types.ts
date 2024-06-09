// DATABASE MODELS TYPES
export type UserData = {
  id: number;
  userId: string;
  email: string;
  profile: {
    id: number;
    userId: string;
    firstName: string;
    lastName: string;
  };
};

export type PetData = {
  id: number;
  refId: string;
  ownerId: string;
  name: string;
  age?: string;
  species: "CAT" | "DOG" | "HORSE";
};

export type CatData = {
  id: number;
  petId: string;
  pettyNames?: string[];
  catSubSpecies?: string;
  colorOfHair?: string;
  hair?: string;
  personality?: string;
  healthCheck?: string;
  bio?: string;
};
