export const JWTDecoder = (token: string) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
};

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
