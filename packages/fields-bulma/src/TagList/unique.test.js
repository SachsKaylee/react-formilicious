import unique from "./unique";

test("Empty array", () => {
  const array = [];
  const res = unique(array);
  expect(res).toEqual([]);
});

test("Array with duplicates", () => {
  const array = ["#1", "#2", "#2", "#3", "#2", "#4", "#1"];
  const res = unique(array);
  expect(res).toEqual(["#1", "#2", "#3", "#4"]);
});

test("Array without duplicates", () => {
  const array = ["#1", "#2", "#3", "#4"];
  const res = unique(array);
  expect(res).toEqual(["#1", "#2", "#3", "#4"]);
});