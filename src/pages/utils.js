export const handlePosition = (triggerRef, tooltipRef) => {
  const screenPadding = 10;
  const screenWidth = document.body.getBoundingClientRect();

  const trigger = triggerRef.current;
  const tooltip = tooltipRef.current;

  const triggerRect = trigger.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();

  const triggerRightX = triggerRect.x + triggerRect.width;
  const tooltipRightX = tooltipRect.x + tooltipRect.width;

  if (tooltipRect.x < 0) {
    tooltip.style.left = "2px";
    tooltip.style.right = "auto";
    tooltip.style.transform = `translateX(${
      -triggerRightX.x + screenPadding
    }px)`;
  } else if (tooltipRightX > screenWidth.right) {
    tooltip.style.left = "auto";
    tooltip.style.right = "2px";
    tooltip.style.transform = `translateX(${
      screenWidth.right - triggerRightX - screenPadding
    }px)`;
  }
};

export const joinDescription = (data, delimiter) => {
  return Array.isArray(data) ? data.join(delimiter) : data;
};
