export type PageState = "open" | "closed" | "special-sold-out";

export function getPageState(state?: string): PageState {
  if (state === "closed" || state === "special-sold-out") {
    return state;
  }

  return "open";
}

export function getCafeStatus(state: PageState) {
  if (state === "closed") {
    return {
      isOpen: false,
      message: "We're closed today",
      nextOpen: "Opens Tuesday at 08:00",
    };
  }

  return {
    isOpen: true,
    message: "Open Now",
  };
}
