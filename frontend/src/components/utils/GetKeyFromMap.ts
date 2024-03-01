export const GetKeyFromValue = <T, K extends keyof any>(
  map: Record<K, T>,
  searchValue: T,
): K | undefined => {
  return (Object.entries(map) as [K, T][]).find(
    ([_, value]) => value === searchValue,
  )?.[0];
};
