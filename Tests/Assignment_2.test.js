const test = require("node:test")
const assert = require("node:assert/strict")

const {
    create_event,
    get_event,
    register_attendee,
    get_attendee,
    check_in,
    attendance_report,
    clearStorage,
} = require("../Assignment_2");
const { type } = require("node:os");

test.describe("testing create event function", () => {
    clearStorage();
    test("testing event creation duplication prevention", () => {
        create_event("birthday", "2026-02-20");
        assert.throws(() => create_event("birthday", "2026-02-20"), {name: "Error"})
    })
    test("testing date validation", () => {
        assert.throws(() => create_event("babyshower", "26/20/2"), {name: "Error"})
    })
})

test.describe("testing register attendee function", () => {
    clearStorage();
    test("testing email validation", () => {
        assert.throws(() => register_attendee("Josh", "josh123gmail", "birthday party"), {name: "Error"})
    });
    test("testing duplicate registration prevention", () => {
        register_attendee("Owen", "owen123@gmail.com", "birthday");
        assert.throws(() => register_attendee("Owen", "owen123@gmail.com", "birthday"), {name: "Error"})
    })
});

test.describe("testing the check in function", () => {
    clearStorage();
    test("testing check in rules", () => {
        register_attendee("Owen", "owen123@gmail.com", "movies");
        assert.throws(() => check_in("Owen", "owen123@gmail.com", "birthday"), {name: "Error"});
    })
})

test.describe("integration testing", () => {
    clearStorage();
    test("register attendee -> stored correctly -> retrieved later", () => {
        register_attendee("Josh", "josh123@gmail.com", "birthday");
        let attendee_info = get_attendee("Josh")
        assert.ok(attendee_info.email)
        assert.deepStrictEqual(attendee_info, {email: "josh123@gmail.com", event_name: "birthday", checked_in: false, type: "Attendee"})
    })
    
    test("Register and check in -> report reflects correct values", () => {
        check_in("Josh", "josh123@gmail.com", "birthday")
        let report = attendance_report("birthday")
        assert.deepStrictEqual(report[3][0], {email: "josh123@gmail.com", event_name: "birthday", checked_in: true, type: "Attendee"})
    })
    
    test("Full workflow", () => {
        create_event("movies", "2026-02-20");
        register_attendee("Cole", "cole123@gmail.com", "movies");
        check_in("Cole", "cole123@gmail.com", "movies")
        let report = attendance_report("movies");
        assert.deepStrictEqual(report, ["movies", 2, 1, [{email: "cole123@gmail.com", event_name: "movies", checked_in: true, type: "Attendee"}]])
    })

})