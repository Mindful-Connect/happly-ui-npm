import * as React from "react";

/**
 * Recursively clones React children and injects shared props
 * into components whose displayName matches the allowed list
 *
 * @param children - React children to clone
 * @param sharedProps - Props to inject into matching children
 * @param allowedDisplayNames - Array of displayNames that should receive the shared props
 * @param uniqueId - Unique identifier for generating stable keys
 * @param asChild - If true, skips the first level (for Slot components)
 */
export function recursiveCloneChildren(
  children: React.ReactElement | React.ReactElement[],
  sharedProps: Record<string, unknown>,
  allowedDisplayNames: string[],
  uniqueId: string,
  asChild?: boolean
): React.ReactNode {
  return React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    const childType = child.type as React.ComponentType & {
      displayName?: string;
    };
    const displayName = childType?.displayName;

    // Check if this child should receive shared props
    const shouldInjectProps =
      displayName && allowedDisplayNames.includes(displayName);

    // Recursively handle nested children
    const childChildren = (child.props as { children?: React.ReactNode })
      .children;
    const clonedChildren = childChildren
      ? recursiveCloneChildren(
          childChildren as React.ReactElement[],
          sharedProps,
          allowedDisplayNames,
          uniqueId,
          false
        )
      : undefined;

    // If asChild is true and this is the first level, just clone with children
    if (asChild && index === 0) {
      return React.cloneElement(child, {
        key: `${uniqueId}-${index}`,
        children: clonedChildren,
      } as Partial<unknown>);
    }

    // Clone with shared props if displayName matches
    if (shouldInjectProps) {
      return React.cloneElement(child, {
        key: `${uniqueId}-${index}`,
        ...sharedProps,
        ...(child.props as object),
        children: clonedChildren,
      } as Partial<unknown>);
    }

    // Just clone with updated children
    return React.cloneElement(child, {
      key: `${uniqueId}-${index}`,
      children: clonedChildren,
    } as Partial<unknown>);
  });
}
