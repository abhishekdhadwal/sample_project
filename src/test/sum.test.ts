
import sum from './sum';


describe("test add function", () => {
  it("should return 15 for add(10,5)", () => {
    let result = sum(10,5); 
    expect(result).toBe(14);
    expect(result).toMatchSnapshot();
  });
  it("should return 9 for add(3,6)", () => {
    let response = sum(3,6);
    expect(response).toBe(9);
    expect(response).toMatchSnapshot();
  });

})


