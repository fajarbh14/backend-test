import supertest from "supertest";

import { startServer } from "../src/testServer";

describe("Doctor API", () => {
  let request: any;
  let serverInstance: any;

  beforeAll(async () => {
    serverInstance = await startServer();
    request = supertest(serverInstance.url);
  });

  afterAll((done) => {
    // Properly close the server
    serverInstance.httpServer.close(done);
  });

  it("Should create a new doctor", async () => {
    const CREATE_DOCTOR = `
        mutation CreateDoctor($input: CreateDoctorInput!) {
          createDoctor(input: $input) {
            id
            name
          }
        }
      `;
    const input = {
      input: {
        name: "John Doe",
      },
    };

    const response = await request
      .post("/graphql")
      .send({ query: CREATE_DOCTOR, variables: input });

    if (response.status !== 200) {
      console.error("Error response:", response.body);
    }

    expect(response.status).toBe(200);
    expect(response.body.data.createDoctor).toBeDefined();
    expect(response.body.data.createDoctor.name).toBe("John Doe");
  });

  it("should return all doctors", async () => {
    const GET_ITEMS = `
        query GetAllDoctors {
          getAllDoctors {
            doctors {
              id
              name
            }
            total
            limit
            page
          }
        }
      `;

    const response = await request.post("/graphql").send({ query: GET_ITEMS });

    expect(response.status).toBe(200);
    expect(response.body.data.getAllDoctors).toBeDefined();
  });
});
