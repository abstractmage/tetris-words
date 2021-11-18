export const getOffset = (relativeNode: HTMLElement, targetNode: HTMLElement) => {
  const relativeNodeRect = relativeNode.getBoundingClientRect();
  const targetNodeRect = targetNode.getBoundingClientRect();

  return {
    left: targetNodeRect.left - relativeNodeRect.left,
    top: targetNodeRect.top - relativeNodeRect.top,
  };
};
