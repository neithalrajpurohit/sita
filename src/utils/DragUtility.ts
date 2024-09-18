interface RectProps {
  width: number;
  height: number;
  left: number;
  top: number;
}

/**
 *
 *
 * @param sourceRect Object
 * @param targetRect Object
 * @returns true if two boxes are overlapping each other
 */
export const isOverlapping = (sourceRect: RectProps, targetRect: RectProps) => {
  return !(
    sourceRect.left + sourceRect.width <= targetRect.left ||
    targetRect.left + targetRect.width <= sourceRect.left ||
    sourceRect.top + sourceRect.height <= targetRect.top ||
    targetRect.top + targetRect.height <= sourceRect.top
  );
};

/**
 *
 * @param sourceRect
 * @param targetRect
 * @returns intersection area between two rectangles by finding the overlapping region between their boundaries.
 */
export const getIntersectionArea = (
  sourceRect: RectProps,
  targetRect: RectProps
) => {
  if (!isOverlapping(sourceRect, targetRect)) return 0;
  var width =
    Math.min(
      sourceRect.left + sourceRect.width,
      targetRect.left + targetRect.width
    ) - Math.max(sourceRect.left, targetRect.left);
  var height =
    Math.min(
      sourceRect.top + sourceRect.height,
      targetRect.top + targetRect.height
    ) - Math.max(sourceRect.top, targetRect.top);
  return width * height;
};

/**
 *
 * @param sourceRect
 * @param targetRect
 * @returns measure of how well the rectangles overlap in relation to their sizes.
 */
export const getIntersectionScore = (
  sourceRect: RectProps,
  targetRect: RectProps
) => {
  var area = getIntersectionArea(sourceRect, targetRect);
  if (!area) return 0;
  var maxArea =
    Math.min(sourceRect.width, targetRect.width) *
    Math.min(sourceRect.height, targetRect.height);
  return (area / maxArea) * 100;
};
