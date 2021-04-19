describe("CellBiologyPicQuiz", function() {
    beforeEach(function() {
        let quizQuestions = [
            {
              question: "Which of these is a plant cell?",
              options: [{name:"animal_cell", image:"animal cell.PNG"}, {name:"mitochondrion", image:"mitochondrion.PNG"},{name:"plant_cell", image:"plant cell.PNG"}],
              answer: "plant_cell",
            },
            {
              question: "Which of these is a chloroplast?",
                  options: [{name:"animal_cell", image:"animal cell.PNG"}, {name:"nucleus_of_plant_cell", image:"nucleus of plant cell.PNG"},{name:"chloroplast", image:"chloroplast.PNG"}],
              answer: "chloroplast",
            },
            {
              question: "Which of these is a mitochondrion?",
                  options: [{name:"mitochondrion", image:"mitochondrion.PNG"}, {name:"nucleus_of_plant_cell", image:"nucleus of plant cell.PNG"},{name:"nucleus_of_animal_cell", image:"nucleus of animal cell.PNG"}],
              answer: "mitochondrion",
            },
          ];
      });
    describe("When loading the questions", function() {
        console.log("loading questions");
        shuffleArray(quizQuestions);
        
        it("should be three questions", function() {
            expect(quizQuestions.length).toEqual(3);
            console.log("quizQuestions.length = ");
            console.log(quizQuestions.length);
        })
    });

});