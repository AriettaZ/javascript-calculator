describe("normalize", function(){
  it('float should have five decimals', function(){
              expect(normalize(2.22222222)).toBe(2.22222);
  });


  it('scientific notation should have five decimals', function(){
              expect(normalize(3.464362981723453e+53)).toBe(3.46436e+53);
  });
});
