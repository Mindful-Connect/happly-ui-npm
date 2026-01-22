import type * as React from "react";

/**
 * Polymorphic component type helper
 * Allows components to change their rendered element via an `as` prop
 */
type AsProp<T extends React.ElementType> = {
  as?: T;
};

type PropsToOmit<T extends React.ElementType, P> = keyof (AsProp<T> & P);

/**
 * PolymorphicComponentProps type
 * Combines the component's own props with the props of the element it renders as
 *
 * @example
 * function Button<T extends React.ElementType = "button">({
 *   as,
 *   children,
 *   ...props
 * }: PolymorphicComponentProps<T, { children: React.ReactNode }>) {
 *   const Component = as || "button";
 *   return <Component {...props}>{children}</Component>;
 * }
 */
export type PolymorphicComponentProps<
  T extends React.ElementType,
  Props = object,
> = AsProp<T> &
  Props &
  Omit<React.ComponentPropsWithoutRef<T>, PropsToOmit<T, Props>>;

/**
 * PolymorphicComponentPropsWithRef type
 * Same as PolymorphicComponentProps but includes ref forwarding support
 */
export type PolymorphicComponentPropsWithRef<
  T extends React.ElementType,
  Props = object,
> = PolymorphicComponentProps<T, Props> & {
  ref?: PolymorphicRef<T>;
};

/**
 * PolymorphicRef type
 * Gets the ref type for a polymorphic component
 */
export type PolymorphicRef<T extends React.ElementType> =
  React.ComponentPropsWithRef<T>["ref"];
