import { Character as CharacterProps } from "@/types/payload";

export class Character {
  public id: number;
  public name: string;
  public description: string;
  public thumbnail: CharacterProps["thumbnail"];
  public comics: CharacterProps["comics"];
  public series: CharacterProps["series"];
  public stories: CharacterProps["stories"];
  public events: CharacterProps["events"];
  public urls: CharacterProps["urls"];

  constructor(public props: CharacterProps) {
    if (!props.description) {
      props.description = "Descrição não informada.";
    }

    if (
      !props.thumbnail ||
      props.thumbnail.path.includes("image_not_available")
    ) {
      props.thumbnail = {
        path: "/placeholder",
        extension: "png",
      };
    }

    Object.assign(this, props);
  }
}
