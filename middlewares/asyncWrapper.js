// const asyncWrapper = (asyncFn) => {
//   return (req, res, next) => {
//     asyncFn(req, res, next).catch((err) => {
//       next(err);
//     });
//   };
// };

const asyncWrapper = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
export default asyncWrapper;
