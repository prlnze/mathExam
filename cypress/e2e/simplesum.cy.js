/// <reference types="cypress" />
// const { contains } = require("cypress/types/jquery");

describe("template spec", () => {
  beforeEach(() => {
    cy.visit("/simple_sum.html");
  });
  it("Checking components", () => {
    cy.contains("Make Millions").should("be.visible");
    cy.get(".cy-btn-generate").should("be.visible");
    cy.get(".question").should("be.visible");
    cy.get(".cy-btn-print").should("be.visible");
  });

  it("Generate questions when 'Make it harder !' button is clicked", () => {
    cy.get(".cy-btn-generate").click();
    cy.get(".question").should("have.length", 10);
  });

  it("Re-generate questions when 'Make it harder !' button is re-clicked", () => {
    cy.get(".cy-btn-generate").click();
    cy.get(".question").should("have.length", 10);
    cy.get(".cy-question-1")
      .invoke("text")
      .then((firstNum) => {
        cy.get(".cy-btn-generate").click();
        cy.get(".question").should("have.length", 10);
        cy.get(".cy-question-1")
          .invoke("text")
          .then((secodeNum) => {
            expect(secodeNum).not.eq(firstNum);
          });
      });
    cy.wait(1000);
  });

  it("Prints the page when the 'Print' button is clicked", () => {
    cy.get(".cy-btn-print").click();
    cy.wait(2000); // Wait for the print dialog to open

    // You can add more assertions here if needed
  });
  it("Generate questions and answer all incorrectly", () => {
    cy.get(".cy-btn-generate").click();

    for (let i = 1; i <= 10; i++) {
      cy.get(`.cy-answer-${i}`).type("123"); // Enter a sample answer
    }

    cy.get(".cy-btn-download").click();
    cy.wait(1000); // Wait for the download to complete

    // Read and verify the downloaded file
    const expectedIsCorrect = 0;
    cy.readFile("./cypress/downloads/math_questions.json").then(
      (parsedData) => {
        const questionsAndAnswers = parsedData.slice(0, -1); // Exclude the last object (CorrectCount and Date)
        const correctAnswersCount = 0;
        const downloadedCorrectAnswersCount =
          parsedData[parsedData.length - 1].CorrectCount;

        expect(downloadedCorrectAnswersCount).to.equal(correctAnswersCount);

        questionsAndAnswers.forEach((item, index) => {
          const { question, solution, userAnswer, isCorrect } = item;
          const expectedIsCorrect = solution.toString() === userAnswer;

          expect(isCorrect).to.equal(expectedIsCorrect);
        });
      }
    );
  });

  it("Generate questions and answer all correctly", () => {
    let questions = [];
    let answers = [];
    cy.get(".cy-btn-generate").click();
    cy.get(".question").should("have.length", 10);

    cy.get(".question").each(($question, index) => {
      const questionText = $question
        .text()
        .trim()
        .replace("Question " + (index + 1) + ":", "")
        .trim()
        .replace("Your Answer:", "")
        .trim();
      const answer = eval(questionText.replace(/,/g, "")); // Evaluate the question to get the answer
      cy.get(`.cy-answer-${index + 1}`).type(answer);
      questions.push(questionText);
      answers.push(answer);
    });

    cy.get(".cy-btn-download").click();
    cy.wait(1000); // Wait for the download to complete

    // Read and verify the downloaded file
    cy.readFile("./cypress/downloads/math_questions.json").then(
      (parsedData) => {
        const questionsAndAnswers = parsedData.slice(0, -1); // Exclude the last object (CorrectCount and Date)
        const correctAnswersCount = 10;
        const downloadedCorrectAnswersCount =
          parsedData[parsedData.length - 1].CorrectCount;

        expect(downloadedCorrectAnswersCount).to.equal(correctAnswersCount);

        questionsAndAnswers.forEach((item, index) => {
          const { question, solution, userAnswer, isCorrect } = item;
          const expectedIsCorrect = solution.toString() === userAnswer;

          expect(isCorrect).to.equal(expectedIsCorrect);
          expect(question).to.equal(questions[index]);
          expect(solution).to.equal(answers[index]);
        });
      }
    );
  });
});
