
describe("CellBiologyCrossQuiz", function() {
    beforeEach(function(){
        loadFixtures('crosswordeasy.html')
        $('.line').myTestedPlugin()

    })
    
    describe("When loading the easy crossword",function(){
        it ("should have 5 questions ",function(){

            expect(5).toEqual($(".line").length);
        })
    });


});
