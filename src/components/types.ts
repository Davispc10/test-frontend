import {
  COMPONENT_SHAPES,
  COMPONENT_SIZES,
  COMPONENT_VARIANTS,
} from "./constants";

export type ComponentSize = typeof COMPONENT_SIZES[number];
export type ComponentShape = typeof COMPONENT_SHAPES[number];
export type ComponentVariant = typeof COMPONENT_VARIANTS[number];

export type BaseComponentProps = {
  size?: ComponentSize;
  shape?: ComponentShape;
  variant?: ComponentVariant;
};
