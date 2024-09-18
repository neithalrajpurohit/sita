import { muuriMap } from "muuri-react";
import { getIntersectionScore } from "./DragUtility";
import { IRUDChartId } from "../component/RiskUserDashboard/RUDTypes";

export const customDragSortPredicate = (
  item: any,
  event: any,
  previousPositionX: any,
  chartIds: any
) => {
  const props = item.getProps();
  const grid: any = muuriMap.getGroup("InsightGrid")[0];

  const gridItems = grid.getItems();

  let drag = item._drag;

  var itemRect: any = {};
  var targetRect: any = {};
  var returnData: any = {};

  var isMigration = item.getGrid() !== grid;
  var gridOffsetLeft = 0;
  var gridOffsetTop = 0;
  var matchScore = 0;
  var matchIndex = -1;
  var hasValidTargets = false;
  var target;
  var score;
  let sourceIndex;

  let sortThreshold = 50;

  itemRect.width = item.getWidth();
  itemRect.height = item.getHeight();
  itemRect.left = item.clientX;
  itemRect.top = item.clientY;

  itemRect.left = drag._gridX + item._marginLeft;
  itemRect.top = drag._gridY + item._marginTop;

  for (let i = 0; i < gridItems.length; i++) {
    target = gridItems[i];

    // If the target item is not active or the target item is the dragged
    // item let's skip to the next item.
    if (!target._isActive || target === item) {
      sourceIndex = i;
      continue;
    }

    // Mark the grid as having valid target items.
    hasValidTargets = true;

    // Calculate the target's overlap score with the dragged item.
    targetRect.width = target._width;
    targetRect.height = target._height;
    targetRect.left = target._left + target._marginLeft + gridOffsetLeft;
    targetRect.top = target._top + target._marginTop + gridOffsetTop;
    score = getIntersectionScore(itemRect, targetRect);

    // Update best match index and score if the target's overlap score with
    // the dragged item is higher than the current best match score.
    if (score > matchScore) {
      matchIndex = i;
      matchScore = score;
    }
  }

  // If there is no valid match and the dragged item is being moved into
  // another grid we need to do some guess work here. If there simply are no
  // valid targets (which means that the dragged item will be the only active
  // item in the new grid) we can just add it as the first item. If we have
  // valid items in the new grid and the dragged item is overlapping one or
  // more of the items in the new grid let's make an exception with the
  // threshold and just pick the item which the dragged item is overlapping
  // most. However, if the dragged item is not overlapping any of the valid
  // items in the new grid let's position it as the last item in the grid.
  if (isMigration && matchScore < sortThreshold) {
    matchIndex = hasValidTargets ? matchIndex : 0;
    matchScore = sortThreshold;
  }

  // Our Custom Logic to prevent bigger card getting swapped with smaller card at bottom

  if (matchScore > sortThreshold && props.id === chartIds.TOP10_ASSETS) {
    if (matchIndex === 4) {
      if (event.clientX > previousPositionX.current) {
        // moving right
        returnData.grid = grid;
        returnData.index = 1;
        returnData.action = isMigration ? "swap" : "swap";
        previousPositionX.current = event.clientX;
        return returnData;
      } else {
        // moving left
        returnData.grid = grid;
        returnData.index = 2;
        returnData.action = isMigration ? "swap" : "swap";
        previousPositionX.current = event.clientX;
        return returnData;
      }
    }
    if (matchIndex === 3) {
      if (event.clientX > previousPositionX.current) {
        // moving right
        returnData.grid = grid;
        returnData.index = 1;
        returnData.action = isMigration ? "swap" : "swap";
        previousPositionX.current = event.clientX;
        return returnData;
      } else {
        // moving left
        returnData.grid = grid;
        returnData.index = 0;
        returnData.action = isMigration ? "swap" : "swap";
        previousPositionX.current = event.clientX;
        return returnData;
      }
    }
  }

  let targetItemTitle = grid._items[matchIndex]?.getProps()?.id;
  let sourceItemTitle = item?.getProps().id;

  if (
    matchScore > sortThreshold &&
    matchIndex === 2 &&
    (sourceItemTitle === chartIds.REQUEST_STATUS ||
      sourceItemTitle === chartIds.REQUEST_TYPE ||
      sourceItemTitle === chartIds.ALERT_TYPE ||
      sourceItemTitle === chartIds.ALERT_CONFIDENCE) &&
    sourceIndex === 4 &&
    targetItemTitle === chartIds.TOP10_ASSETS
  ) {
    let temp = grid._items[1];
    grid._items[1] = grid._items[2];
    grid._items[2] = temp;

    returnData.grid = grid;
    returnData.index = matchIndex;
    returnData.action = isMigration ? "swap" : "swap";

    return returnData;
  }

  if (
    matchScore > sortThreshold &&
    matchIndex === 1 &&
    (sourceItemTitle === chartIds.REQUEST_STATUS ||
      sourceItemTitle === chartIds.REQUEST_TYPE ||
      sourceItemTitle === chartIds.ALERT_TYPE ||
      sourceItemTitle === chartIds.ALERT_CONFIDENCE) &&
    sourceIndex === 4 &&
    targetItemTitle === chartIds.TOP10_ASSETS
  ) {
    let temp = grid._items[1];
    grid._items[1] = grid._items[2];
    grid._items[2] = temp;

    returnData.grid = grid;
    returnData.index = matchIndex;
    returnData.action = isMigration ? "swap" : "swap";

    return returnData;
  }

  if (
    matchScore > sortThreshold &&
    matchIndex === 1 &&
    (sourceItemTitle === chartIds.REQUEST_STATUS ||
      sourceItemTitle === chartIds.REQUEST_TYPE ||
      sourceItemTitle === chartIds.ALERT_TYPE ||
      sourceItemTitle === chartIds.ALERT_CONFIDENCE) &&
    sourceIndex === 3 &&
    targetItemTitle === chartIds.TOP10_ASSETS
  ) {
    let temp = grid._items[0];
    grid._items[0] = grid._items[1];
    grid._items[1] = temp;

    returnData.grid = grid;
    returnData.index = matchIndex;
    returnData.action = isMigration ? "swap" : "swap";
    return returnData;
  }

  if (
    matchScore > sortThreshold &&
    matchIndex === 0 &&
    (sourceItemTitle === chartIds.REQUEST_STATUS ||
      sourceItemTitle === chartIds.REQUEST_TYPE ||
      sourceItemTitle === chartIds.ALERT_TYPE ||
      sourceItemTitle === chartIds.ALERT_CONFIDENCE) &&
    sourceIndex === 3 &&
    targetItemTitle === chartIds.TOP10_ASSETS
  ) {
    let temp = grid._items[0];
    grid._items[0] = grid._items[1];
    grid._items[1] = temp;

    returnData.grid = grid;
    returnData.index = matchIndex;
    returnData.action = isMigration ? "swap" : "swap";
    return returnData;
  }

  // Diagonal case
  if (
    matchScore > sortThreshold &&
    matchIndex === 2 &&
    (sourceItemTitle === chartIds.REQUEST_STATUS ||
      sourceItemTitle === chartIds.REQUEST_TYPE ||
      sourceItemTitle === chartIds.ALERT_TYPE ||
      sourceItemTitle === chartIds.ALERT_CONFIDENCE) &&
    sourceIndex === 3 &&
    targetItemTitle === chartIds.TOP10_ASSETS
  ) {
    let temp = grid._items[0];
    grid._items[0] = grid._items[2];
    grid._items[2] = temp;

    returnData.grid = grid;
    returnData.index = matchIndex;
    returnData.action = isMigration ? "swap" : "swap";
    return returnData;
  }

  if (
    matchScore > sortThreshold &&
    matchIndex === 0 &&
    (sourceItemTitle === chartIds.REQUEST_STATUS ||
      sourceItemTitle === chartIds.REQUEST_TYPE ||
      sourceItemTitle === chartIds.ALERT_TYPE ||
      sourceItemTitle === chartIds.ALERT_CONFIDENCE) &&
    sourceIndex === 4 &&
    targetItemTitle === chartIds.TOP10_ASSETS
  ) {
    let temp = grid._items[0];
    grid._items[0] = grid._items[2];
    grid._items[2] = temp;

    returnData.grid = grid;
    returnData.index = matchIndex;
    returnData.action = isMigration ? "swap" : "swap";
    return returnData;
  }

  // Check if the best match overlaps enough to justify a placement switch.
  if (matchScore >= sortThreshold) {
    returnData.grid = grid;
    returnData.index = matchIndex;
    returnData.action = isMigration ? "swap" : "swap";

    return returnData;
  }
};
export const customRiskDragSortPredicate = (
  item: any,
  event: any,
  previousPositionX: any,
  chartIds: IRUDChartId
) => {
  const props = item.getProps();
  const grid: any = muuriMap.getGroup("RiskGrid")[0];

  const gridItems = grid.getItems();

  let drag = item._drag;

  var itemRect: any = {};
  var targetRect: any = {};
  var returnData: any = {};

  var isMigration = item.getGrid() !== grid;
  var gridOffsetLeft = 0;
  var gridOffsetTop = 0;
  var matchScore = 0;
  var matchIndex = -1;
  var hasValidTargets = false;
  var target;
  var score;
  let sourceIndex;

  let sortThreshold = 50;

  itemRect.width = item.getWidth();
  itemRect.height = item.getHeight();
  itemRect.left = item.clientX;
  itemRect.top = item.clientY;

  itemRect.left = drag._gridX + item._marginLeft;
  itemRect.top = drag._gridY + item._marginTop;

  for (let i = 0; i < gridItems.length; i++) {
    target = gridItems[i];

    // If the target item is not active or the target item is the dragged
    // item let's skip to the next item.
    if (!target._isActive || target === item) {
      sourceIndex = i;
      continue;
    }

    // Mark the grid as having valid target items.
    hasValidTargets = true;

    // Calculate the target's overlap score with the dragged item.
    targetRect.width = target._width;
    targetRect.height = target._height;
    targetRect.left = target._left + target._marginLeft + gridOffsetLeft;
    targetRect.top = target._top + target._marginTop + gridOffsetTop;
    score = getIntersectionScore(itemRect, targetRect);

    // Update best match index and score if the target's overlap score with
    // the dragged item is higher than the current best match score.
    if (score > matchScore) {
      matchIndex = i;
      matchScore = score;
    }
  }

  // If there is no valid match and the dragged item is being moved into
  // another grid we need to do some guess work here. If there simply are no
  // valid targets (which means that the dragged item will be the only active
  // item in the new grid) we can just add it as the first item. If we have
  // valid items in the new grid and the dragged item is overlapping one or
  // more of the items in the new grid let's make an exception with the
  // threshold and just pick the item which the dragged item is overlapping
  // most. However, if the dragged item is not overlapping any of the valid
  // items in the new grid let's position it as the last item in the grid.
  if (isMigration && matchScore < sortThreshold) {
    matchIndex = hasValidTargets ? matchIndex : 0;
    matchScore = sortThreshold;
  }

  // Our Custom Logic to prevent bigger card getting swapped with smaller card at bottom

  if (matchScore > sortThreshold && props.id === chartIds.RUD_RISK_IMPACT) {
    if (matchIndex === 4) {
      if (event.clientX > previousPositionX.current) {
        // moving right
        returnData.grid = grid;
        returnData.index = 1;
        returnData.action = isMigration ? "swap" : "swap";
        previousPositionX.current = event.clientX;
        return returnData;
      } else {
        // moving left
        returnData.grid = grid;
        returnData.index = 2;
        returnData.action = isMigration ? "swap" : "swap";
        previousPositionX.current = event.clientX;
        return returnData;
      }
    }
    if (matchIndex === 3) {
      if (event.clientX > previousPositionX.current) {
        // moving right
        returnData.grid = grid;
        returnData.index = 1;
        returnData.action = isMigration ? "swap" : "swap";
        previousPositionX.current = event.clientX;
        return returnData;
      } else {
        // moving left
        returnData.grid = grid;
        returnData.index = 0;
        returnData.action = isMigration ? "swap" : "swap";
        previousPositionX.current = event.clientX;
        return returnData;
      }
    }
  }

  let targetItemTitle = grid._items[matchIndex]?.getProps()?.id;
  let sourceItemTitle = item?.getProps().id;

  if (
    matchScore > sortThreshold &&
    matchIndex === 2 &&
    (sourceItemTitle === chartIds.RUD_FUNCTIONCHART ||
      sourceItemTitle === chartIds.RUD_PROCESSCHART ||
      sourceItemTitle === chartIds.RUD_GEOCHART ||
      sourceItemTitle === chartIds.RUD_HEATMAPCHART) &&
    sourceIndex === 4 &&
    targetItemTitle === chartIds.RUD_RISK_IMPACT
  ) {
    let temp = grid._items[1];
    grid._items[1] = grid._items[2];
    grid._items[2] = temp;

    returnData.grid = grid;
    returnData.index = matchIndex;
    returnData.action = isMigration ? "swap" : "swap";

    return returnData;
  }

  if (
    matchScore > sortThreshold &&
    matchIndex === 1 &&
    (sourceItemTitle === chartIds.RUD_FUNCTIONCHART ||
      sourceItemTitle === chartIds.RUD_PROCESSCHART ||
      sourceItemTitle === chartIds.RUD_GEOCHART ||
      sourceItemTitle === chartIds.RUD_HEATMAPCHART) &&
    sourceIndex === 4 &&
    targetItemTitle === chartIds.RUD_RISK_IMPACT
  ) {
    let temp = grid._items[1];
    grid._items[1] = grid._items[2];
    grid._items[2] = temp;

    returnData.grid = grid;
    returnData.index = matchIndex;
    returnData.action = isMigration ? "swap" : "swap";

    return returnData;
  }

  if (
    matchScore > sortThreshold &&
    matchIndex === 1 &&
    (sourceItemTitle === chartIds.RUD_FUNCTIONCHART ||
      sourceItemTitle === chartIds.RUD_PROCESSCHART ||
      sourceItemTitle === chartIds.RUD_GEOCHART ||
      sourceItemTitle === chartIds.RUD_HEATMAPCHART) &&
    sourceIndex === 3 &&
    targetItemTitle === chartIds.RUD_RISK_IMPACT
  ) {
    let temp = grid._items[0];
    grid._items[0] = grid._items[1];
    grid._items[1] = temp;

    returnData.grid = grid;
    returnData.index = matchIndex;
    returnData.action = isMigration ? "swap" : "swap";
    return returnData;
  }

  if (
    matchScore > sortThreshold &&
    matchIndex === 0 &&
    (sourceItemTitle === chartIds.RUD_FUNCTIONCHART ||
      sourceItemTitle === chartIds.RUD_PROCESSCHART ||
      sourceItemTitle === chartIds.RUD_GEOCHART ||
      sourceItemTitle === chartIds.RUD_HEATMAPCHART) &&
    sourceIndex === 3 &&
    targetItemTitle === chartIds.RUD_RISK_IMPACT
  ) {
    let temp = grid._items[0];
    grid._items[0] = grid._items[1];
    grid._items[1] = temp;

    returnData.grid = grid;
    returnData.index = matchIndex;
    returnData.action = isMigration ? "swap" : "swap";
    return returnData;
  }

  // Diagonal case
  if (
    matchScore > sortThreshold &&
    matchIndex === 2 &&
    (sourceItemTitle === chartIds.RUD_FUNCTIONCHART ||
      sourceItemTitle === chartIds.RUD_PROCESSCHART ||
      sourceItemTitle === chartIds.RUD_GEOCHART ||
      sourceItemTitle === chartIds.RUD_HEATMAPCHART) &&
    sourceIndex === 3 &&
    targetItemTitle === chartIds.RUD_RISK_IMPACT
  ) {
    let temp = grid._items[0];
    grid._items[0] = grid._items[2];
    grid._items[2] = temp;

    returnData.grid = grid;
    returnData.index = matchIndex;
    returnData.action = isMigration ? "swap" : "swap";
    return returnData;
  }

  if (
    matchScore > sortThreshold &&
    matchIndex === 0 &&
    (sourceItemTitle === chartIds.RUD_FUNCTIONCHART ||
      sourceItemTitle === chartIds.RUD_PROCESSCHART ||
      sourceItemTitle === chartIds.RUD_GEOCHART ||
      sourceItemTitle === chartIds.RUD_HEATMAPCHART) &&
    sourceIndex === 4 &&
    targetItemTitle === chartIds.RUD_RISK_IMPACT
  ) {
    let temp = grid._items[0];
    grid._items[0] = grid._items[2];
    grid._items[2] = temp;

    returnData.grid = grid;
    returnData.index = matchIndex;
    returnData.action = isMigration ? "swap" : "swap";
    return returnData;
  }

  // Check if the best match overlaps enough to justify a placement switch.
  if (matchScore >= sortThreshold) {
    returnData.grid = grid;
    returnData.index = matchIndex;
    returnData.action = isMigration ? "swap" : "swap";

    return returnData;
  }
};
