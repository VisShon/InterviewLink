describe("Website UI Testing", () => {
  it("Tests Website workflow", () => {
    cy.viewport(1920, 944);

    //Test1 admin login
    cy.visit("http://localhost:3000/login");
    cy.get("input[type='email']").click();
    cy.get("input[type='email']").type("mathworks69@gmail.com");
    cy.get("input[type='password']").click();
    cy.get("input[type='password']").type("admin123");
    cy.get("button").click();

    //Test2 admin selects candidate and schedules interview
    cy.get("div.p-5 > button:nth-of-type(1)").click();
    cy.get("div.h-\\[20vh\\] > button:nth-of-type(1)").click();
    cy.get("div.h-\\[43vh\\] > button:nth-of-type(1)").click();
    cy.get("div.gap-10 > div.gap-10 p").click();

    //Test3 test support and logout options
    cy.get("a:nth-of-type(3)").click();
    cy.get("#logoutButton").click();

    //Test4 interviewer login
    cy.reload();
    cy.get("input[type='email']").click();
    cy.get("input[type='email']").type("vshon447@gmail.com");
    cy.get("input[type='password']").click();
    cy.get("input[type='password']").type("vishnu");
    cy.get("button").click();

    //Test5 interview conducted
    cy.get("div > a:nth-of-type(2)").click();
    cy.get("#__next > div a:nth-of-type(3)").click();
    cy.get("div > a:nth-of-type(1)").click();
    cy.get("div:nth-of-type(1) > div.h-\\[60\\%\\] > a").click();

    //Test6 test links sent
    cy.get("#Assessment").click();
    cy.get("#Meet").click();

    //Test7 give feedback
    cy.get("div.w-\\[45\\%\\] > div > input").click();
    cy.get("div.w-\\[45\\%\\] > div > input").type("good");
    cy.get("textarea").click();
    cy.get("textarea").type("good");
  

    //Test8 submit feedback update status and logout
    cy.get("div.gap-10 > main button:nth-of-type(1)").click();
    cy.get("button.mx-5").click();
    cy.visit("http://localhost:3000");
    cy.reload();
    cy.get("#logoutButton").click();

    //Test9 admin login
    cy.get("input[type='email']").click();
    cy.get("input[type='email']").type("mathworks69@gmail.com");
    cy.get("input[type='password']").click();
    cy.get("input[type='password']").type("admin123");
    cy.get("button").click();


    //Test10 admin decision making workflow
    cy.get("div > a:nth-of-type(2)").click();
    cy.get("a:nth-of-type(3) p").click();
    cy.get("button.bg-main").click();
    cy.get("a:nth-of-type(2) p").click();
    cy.get("button.bg-\\[red\\]").click();
    cy.get("a:nth-of-type(1) > img").click();
    cy.get("#logoutButton").click();
  });
});
