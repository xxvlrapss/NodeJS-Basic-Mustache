import Mustache from "mustache"
import fs from "fs/promises"

test("Menggunakan Mustache", () => {
    const data = Mustache.render("Hello {{name}}", {name: "Dimas"});
    // Hello Dimas
    expect(data).toBe("Hello Dimas");
});


test("Menggunakan Mustache Cache", () => {
    Mustache.parse("Hello {{name}}");

    const data = Mustache.render("Hello {{name}}", {name: "Dimas"});
    // Hello Dimas
    expect(data).toBe("Hello Dimas");
});


test("Tags", () => {
    const data = Mustache.render("Hello {{name}}, my hobby is {{{hobby}}}", {
        name: "Dimas",
        hobby: "<b>Workout</b>"
    });
    // Hello Dimas
    expect(data).toBe("Hello Dimas, my hobby is <b>Workout</b>");
});

test("Nested Object", () => {
    const data = Mustache.render("Hello {{person.name}}", {
        person: {
            name: "Dimas"
        }
    });
    // Hello Eko
    expect(data).toBe("Hello Dimas");
});

test("Mustache File", async () => {
    const helloTemplate = await fs.readFile("./templates/hello.mustache")
        .then(data => data.toString());

    const data = Mustache.render(helloTemplate, {
        title: "xxvlraps"
    });
    console.info(data);
    expect(data).toContain("xxvlraps");
});

test("Mustache Sections Not Show", async () => {
    const helloTemplate = await fs.readFile("./templates/person.mustache")
        .then(data => data.toString());

    const data = Mustache.render(helloTemplate, {});
    console.info(data);
    expect(data).not.toContain("Hello Dimas!");
});

test("Mustache Sections Show", async () => {
    const helloTemplate = await fs.readFile("./templates/person.mustache")
        .then(data => data.toString());

    const data = Mustache.render(helloTemplate, {
        person: {
            name: "Dimas"
        }
    });
    console.info(data);
    expect(data).toContain("Hello Person");
});


test("Sections Data", async () => {
    const helloTemplate = await fs.readFile("./templates/person.mustache")
        .then(data => data.toString());

    const data = Mustache.render(helloTemplate, {
        person: {
            name: "Dimas"
        }
    });
    console.info(data);
    expect(data).toContain("Hello Person Dimas!");
});

test("Inverted Sections", async () => {
    const helloTemplate = await fs.readFile("./templates/person.mustache")
        .then(data => data.toString());

    const data = Mustache.render(helloTemplate, {});
    console.info(data);
    expect(data).toContain("Hello Guest");
});

test("List", async () => {
    const helloTemplate = await fs.readFile("./templates/hobbies.mustache")
        .then(data => data.toString());

    const data = Mustache.render(helloTemplate, {
        hobbies: ["Coding", "Gaming", "Reading", "Workout"]
    });
    console.info(data);
    expect(data).toContain("Coding");
    expect(data).toContain("Gaming");
    expect(data).toContain("Reading");
    expect(data).toContain("Workout");
});

test("List Object", async () => {
    const helloTemplate = await fs.readFile("./templates/students.mustache")
        .then(data => data.toString());

    const data = Mustache.render(helloTemplate, {
        students: [
            {name: "Dimas", value: 100},
            {name: "Yoga", value: 85}
        ]
    });
    console.info(data);
    expect(data).toContain("Dimas");
    expect(data).toContain("Yoga");
    expect(data).toContain("100");
    expect(data).toContain("85");
});

test("Functions", async () => {
    const parameter = {
        name: "Dimas",
        upper: () => {
            return (text, render) => {
                return render(text).toUpperCase();
            }
        }
    }

    const data = Mustache.render("Hello {{#upper}}{{name}}{{/upper}}", parameter);
    console.info(data);
    expect(data).toBe("Hello DIMAS");
});

test("Comment", async () => {
    const helloTemplate = await fs.readFile("./templates/comment.mustache")
        .then(data => data.toString());

    const data = Mustache.render(helloTemplate, {
        title: "Dimas"
    });
    console.info(data);
    expect(data).toContain("Dimas");
    expect(data).not.toContain("Merupakan Komentar");
});

test("Partials", async () => {
    const contentTemplate = await fs.readFile("./templates/content.mustache")
        .then(data => data.toString());
    const headerTemplate = await fs.readFile("./templates/header.mustache")
        .then(data => data.toString());
    const footerTemplate = await fs.readFile("./templates/footer.mustache")
        .then(data => data.toString());

    const data = Mustache.render(contentTemplate, {
        title: "Dimas",
        content: "Belajar Mustache JS with Mas Eko"
    }, {
        header: headerTemplate,
        footer: footerTemplate
    });

    console.info(data);
    expect(data).toContain("Dimas");
    expect(data).toContain("Belajar Mustache JS with Mas Eko");
    expect(data).toContain("Powered by Programmer Zaman Now");
});
