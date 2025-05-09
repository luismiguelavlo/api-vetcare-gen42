import { Pet } from "../../../data";

export class CreatorPetService {
  async execute(data: any) {
    const pet = new Pet();
    pet.name = data.name;
    pet.breed = data.breed;
    pet.weight = data.weight;

    try {
      await pet.save();
      return {
        message: "Pet created successfully",
      };
    } catch (error) {
      console.error("Error creating pet:", error);
      throw new Error("Failed to create pet");
    }
  }
}
