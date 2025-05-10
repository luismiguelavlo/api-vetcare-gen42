import { FinderPetService } from "./finder-pet.service";

export class DeletePetService {
  constructor(private readonly finderPetService: FinderPetService) {}

  async execute(id: string) {
    const pet = await this.finderPetService.executeByFindOne(id);

    pet.status = false;

    try {
      await pet.save();
      return {
        message: "Pet deleted successfully",
      };
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete pet");
    }
  }
}
