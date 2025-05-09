import { Pet } from "../../../data";

export class FinderPetService {
  async executeByFindAll() {
    const pets = await Pet.find();
    return pets;
  }

  async executeByFindOne(id: string) {
    const pet = await Pet.findOne({
      where: {
        id,
      },
    });

    if (!pet) {
      throw new Error("Pet not found");
    }

    return pet;
  }
}
