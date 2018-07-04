describe("view", function() {

  beforeEach(function() {
    var dummyMemory = document.createElement('div');
    document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyMemory);
  });

  describe("it should update Memory", function() {
    it("should update memory", function() {
      updateMemory('2.567')
      expect(document.getElementById("current-memory").innerHTML).toEqual('2.567');
    });
    it("should update e+ to E", function() {
      updateMemory('2.34e+10')
      expect(document.getElementById("current-memory").innerHTML).toEqual('2.34E10');
    });
  });


});
