export const formatTime = (inputDate: string | Date | null): string => {
    if (!inputDate) return "N/A";
    return new Date(inputDate).toLocaleTimeString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });
};
