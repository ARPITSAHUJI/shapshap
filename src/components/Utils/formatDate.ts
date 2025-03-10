export const formatDate = (inputDate: string | Date | null): string => {
    if (!inputDate) return "N/A";
    return new Date(inputDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};
