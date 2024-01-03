export const mps2mph = (mps: number) => {
  return parseFloat((mps * 2.237).toFixed(2));
};

export const filterArray = <T>(arr: T[]) => {
  // const filteredData = data.filter(
  //   (data: Truck) => !data.name.toLowerCase().includes("inactive")
  // );
};

// export const sortArray = <T>(arr: T[], index: string) => {
//   arr.sort((prev, next) => {
//     return next - prev[index];
//   });
// };
