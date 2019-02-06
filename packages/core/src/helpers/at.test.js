import at, { putAt } from "./at";

const getObj = () => ({
  key1: 1,
  key2: 2,
  key3: 3,
  key4: {
    key1: 4,
    key2: {
      key1: 5,
      key2: 6
    },
    key3: 7
  }
});

const run = () => {
  describe(at.name, () => {
    test("root", () => {
      const input = "";
      const obj = getObj();
      const result = at(input, obj);
      expect(result).toEqual(obj);
    });

    test("non existant", () => {
      const input = "test";
      const obj = getObj();
      const result = at(input, obj);
      expect(result).toEqual(undefined);
    });

    test("1 layer", () => {
      const input = "key1";
      const obj = getObj();
      const result = at(input, obj);
      expect(result).toEqual(1);
    });

    test("2 layer", () => {
      const input = "key4.key1";
      const obj = getObj();
      const result = at(input, obj);
      expect(result).toEqual(4);
    });

    test("3 layer", () => {
      const input = "key4.key2.key2";
      const obj = getObj();
      const result = at(input, obj);
      expect(result).toEqual(6);
    });
  });

  describe(putAt.name, () => {
    test("root", () => {
      const input = "";
      const obj = getObj();
      const result = putAt(input, obj, "value");
      expect(result).toEqual("value");
    });

    test("non existant", () => {
      const input = "test";
      const obj = getObj();
      const result = putAt(input, obj, "value");
      const shouldBe = getObj();
      shouldBe.test = "value";
      expect(result).toEqual(shouldBe);
    });

    test("1 layer", () => {
      const input = "key1";
      const obj = getObj();
      const result = putAt(input, obj, "value");
      const shouldBe = getObj();
      shouldBe.key1 = "value";
      expect(result).toEqual(shouldBe);
    });

    test("2 layer", () => {
      const input = "key4.key1";
      const obj = getObj();
      const result = putAt(input, obj, "value");
      const shouldBe = getObj();
      shouldBe.key4.key1 = "value";
      expect(result).toEqual(shouldBe);
    });

    test("3 layer", () => {
      const input = "key4.key2.key2";
      const obj = getObj();
      const result = putAt(input, obj, "value");
      const shouldBe = getObj();
      shouldBe.key4.key2.key2 = "value";
      expect(result).toEqual(shouldBe);
    });
  });
};

run();