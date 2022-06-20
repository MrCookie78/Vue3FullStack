const request = require("supertest");
const app = require("../app");
const {createChaine, createUser, Chaine, User} = require("../mongo");

let chaineTest = {};
let userTest = {};
let token = "";

describe("NodeJS API", () => {

	// beforeAll(() => { /* console.log("beforeAll") */ });
	// afterEach(() => { /* console.log("afterAll") */ });
	// beforeEach(() => { /* console.log("beforeEach") */ });
	afterAll(async () => { 
		if(userTest._id){
			await User.findByIdAndDelete(userTest._id);
		}
	});

	describe("Route /signup", () => {

		test("Method GET \t-> Undefined method", async () => {
			const res = await request(app)
				.get("/signup")
				.expect(404)
				.expect("Content-Type", /html/);
		});

		test("Method PUT \t-> Undefined method", async () => {
			const res = await request(app)
				.put("/signup")
				.expect(404)
				.expect("Content-Type", /html/);
		});

		test("Method DELETE \t-> Undefined method", async () => {
			const res = await request(app)
				.delete("/signup")
				.expect(404)
				.expect("Content-Type", /html/);
		});

		test("Method POST \t-> Valid DATA", async () => {
			const res = await request(app)
				.post("/signup")
				.send({
					email: "test@test.fr",
					username: "test",
					motdepasse: "test"
				})
				.expect(201)
				.expect("Content-Type", /json/);
			const data = JSON.parse(res.text);
			expect(data.email).toBe("test@test.fr");
	
			let user = await User.findOne({email: data.email, username: data.username});
			userTest = user;
		});
	
		test("Method POST \t-> Email already exist", async () => {
			const res = await request(app)
				.post("/signup")
				.send({
					email: "test@test.fr",
					username: "test2",
					motdepasse: "test2"
				})
				.expect(400)
				.expect("Content-Type", /html/);
		});

		test.each([	
			{ email: 123, username: 1, motdepasse: 1 }, 
			{ email: "A1Z2E3R4@A1Z2E3R4.fr", username: "1", motdepasse: "1" },
			{ email: "A1Z2E3R4@A1Z2E3R4.fr" },
			{ username: "1" },
			{ motdepasse: "fauxMotDePasse" },
			{}
		])("Method POST \t-> Invalid DATA : Should refuse %p. ", async (invalidObject) => {
				const result = await request(app)
				.post("/signup")
				.send(invalidObject)
				.expect(400);
			}
		);

	});

	describe("Route /login", () => {

		test("Method GET \t-> Undefined method", async () => {
			const res = await request(app)
				.get("/login")
				.expect(404)
				.expect("Content-Type", /html/);
		});

		test("Method PUT \t-> Undefined method", async () => {
			const res = await request(app)
				.put("/login")
				.expect(404)
				.expect("Content-Type", /html/);
		});

		test("Method DELETE \t-> Undefined method", async () => {
			const res = await request(app)
				.delete("/login")
				.expect(404)
				.expect("Content-Type", /html/);
		});

		test("Method POST \t-> Valid DATA", async () => {
			const res = await request(app)
			.post("/login")
			.send({
				email: "test@test.fr",
				motdepasse: "test"
			})
			.expect(200)
			.expect("Content-Type", /json/);
			const data = JSON.parse(res.text);
				expect(res.header['x-auth-token']);
				expect(data.username).toBe("test");
				token = res.header['x-auth-token'];
			});

		test.each([	
			{ email: "fauxmail@test.fr", motdepasse: "test" }, 
			{ email: "test@test.fr", motdepasse: "fauxMotDePasse" },
			{ email: "test@test.fr" },
			{ motdepasse: "fauxMotDePasse" },
			{}
		])("Method POST \t-> Invalid DATA : Should refuse %p. Invalid DATA", async (invalidObject) => {
			const result = await request(app)
				.post("/login")
				.send(invalidObject)
				.expect(400);
			}
		);
	
	});

	describe("Route /me", () => {
		test("Method GET \t-> Valid token", async () => {
			const res = await request(app)
				.get("/me")
				.set('x-auth-token', token)
				.expect(200)
				.expect("Content-Type", /json/);
			const data = JSON.parse(res.text);
			let user = await User.findById(userTest._id);
			user = JSON.parse(JSON.stringify(user));
			expect(user.username).toBe("test");
		});
	});

	describe("Route /chaines", () => {

		test("Method GET\t", async () => {
			const res = await request(app)
				.get("/chaines")
				.expect(200)
				.expect("Content-Type", /json/);
			
				const data = JSON.parse(res.text);
				let chaines = await Chaine.find({});
				chaines = JSON.parse(JSON.stringify(chaines));
				expect(data).toMatchObject(chaines);
		});

		test("Method PUT \t-> Undefined method", async () => {
			const res = await request(app)
				.put("/chaines")
				.expect(404)
				.expect("Content-Type", /html/);
		});
		
		test("Method POST \t-> Undefined method", async () => {
			const res = await request(app)
				.post("/chaines")
				.expect(404)
				.expect("Content-Type", /html/);
		});

		test("Method DELETE \t-> Undefined method", async () => {
			const res = await request(app)
				.delete("/chaines")
				.expect(404)
				.expect("Content-Type", /html/);
		});

	});

	describe("Route /chaine", () => {

		test("Method GET \t-> Undefined method", async () => {
			const res = await request(app)
				.get("/chaine")
				.expect(404)
				.expect("Content-Type", /html/);
		});

		test("Method PUT \t-> Undefined method", async () => {
			const res = await request(app)
				.put("/chaine")
				.expect(404)
				.expect("Content-Type", /html/);
		});

		test("Method DELETE \t-> Undefined method", async () => {
			const res = await request(app)
				.delete("/chaine")
				.expect(404)
				.expect("Content-Type", /html/);
		});

		test("Method POST \t-> Valid DATA and Valid token", async () => {
			const res = await request(app)
				.post("/chaine")
				.send({
					chaine: "test",
				})
				.set('x-auth-token', token)
				.expect(201)
				.expect("Content-Type", /json/);
			const data = JSON.parse(res.text);
			let chaine = await Chaine.findById(data._id);
			chaine = JSON.parse(JSON.stringify(chaine));
			expect(chaine.chaine).toBe("test");
			chaineTest = chaine;
		});

		test("Method POST \t-> Valid DATA and Unvalid token", async () => {
			const res = await request(app)
				.post("/chaine")
				.send({
					chaine: "test",
				})
				.set('x-auth-token', "123")
				.expect(400)
				.expect("Content-Type", /json/);
		});

		test("Method POST \t-> Valid DATA without token", async () => {
			const res = await request(app)
				.post("/chaine")
				.send({
					chaine: "test",
				})
				.expect(401)
				.expect("Content-Type", /json/);
		});
	
		test("Method POST \t-> Invalid DATA", async () => {
			const res = await request(app)
				.post("/chaine")
				.send({
					ch: "test"
				})
				.set('x-auth-token', token)
				.expect(400)
				.expect("Content-Type", /json/);
		});

	})
	
	describe("Route /chaine/:id", () => {

		test("Method GET \t-> Valid ID", async () => {
			const res = await request(app)
				.get("/chaine/" + chaineTest._id)
				.expect(200)
				.expect("Content-Type", /json/);
			
				const data = JSON.parse(res.text);
				let chaine = await Chaine.findById(chaineTest._id);
				chaine = JSON.parse(JSON.stringify(chaine));
				expect(data).toMatchObject(chaine);
		});
	
		test("Method GET \t-> undefined ID", async () => {
			const res = await request(app)
				.get("/chaine/dvfdscnjodz")
				.expect(404)
				.expect("Content-Type", /json/);
		});

		test("Method PUT \t-> Valid ID and Valid DATA", async () => {
			const response = await request(app)
				.put("/chaine/" + chaineTest._id)
				.send({
					chaine: "test modifié",
				})
				.expect(200)
				.expect("Content-Type", /json/);
			const data_1 = JSON.parse(response.text);
			expect(data_1.chaine).toBe("test modifié");
		});
	
		test("Method PUT \t-> Invalid ID", () => {
			return request(app)
				.put("/chaine/incorrectTest")
				.send({
					chaine: "test modifié",
				})
				.expect(404)
				.expect("Content-Type", /json/);
		});
	
		test("Method PUT \t-> Invalid DATA", () => {
			return request(app)
				.put("/chaine/" + chaineTest._id)
				.send({
					ch : "test modifié",
				})
				.expect(400)
				.expect("Content-Type", /json/);
		});

		test("Method DELETE \t-> Valid ID and Valid token", () => {
			return request(app)
			.delete("/chaine/" + chaineTest._id)
			.set('x-auth-token', token)
			.expect(200)
			.expect("Content-Type", /json/);
		});

		test("Method DELETE \t-> Invalid ID and Valid token", () => {
			return request(app)
			.delete("/chaine/hfdjshdsi")
			.set('x-auth-token', token)
			.expect(404)
			.expect("Content-Type", /json/);
		});

		test("Method DELETE \t-> Valid ID and invalid token", () => {
			return request(app)
			.delete("/chaine/" + chaineTest._id)
			.set('x-auth-token', "aze")
			.expect(400)
			.expect("Content-Type", /json/);
		});

		test("Method DELETE \t-> Valid ID without token", () => {
			return request(app)
			.delete("/chaine/" + chaineTest._id)
			.expect(401)
			.expect("Content-Type", /json/);
		});

		test("Method POST \t-> Undefined method", () => {
			return request(app)
			.post("/chaine/hfdis")
			.expect(404)
			.expect("Content-Type", /html/);
		});

	});

});