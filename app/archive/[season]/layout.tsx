export default function ({ children }: { children: React.ReactNode }) {
  return children;
}

export const generateStaticParams = async () => {
  // create an array of paths starting from the 1950 season up until the previous year
  return Array.from({ length: new Date().getFullYear() - 1950 }, (_, i) => ({
    season: (1950 + i).toString(),
  }));
};
