import { Reference as ReferenceProps } from "@/types/payload";

export class Event {
  public description?: string;
  public id: number;
  public thumbnail: ReferenceProps["thumbnail"];
  public title: string;

  constructor(public props: ReferenceProps) {
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
