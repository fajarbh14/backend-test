import supertest from "supertest";

import { startServer } from "../src/testServer";

describe("Doctor API", () => {
  let request: any;
  let serverInstance: any;
  let id: any; // Define a variable to store the ID

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
    id = response.body.data.createDoctor.id; // Store the ID
  });

  it("should return all doctors", async () => {
    const GET_ALL_DOCTORS = `
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

    const response = await request
      .post("/graphql")
      .send({ query: GET_ALL_DOCTORS });

    expect(response.status).toBe(200);
    expect(response.body.data.getAllDoctors).toBeDefined();
  });

  it("should get by id doctor", async () => {
    const GET_BY_ID_DOCTOR = `
        query GetByIdDoctor($id: ID!) {
          getByIdDoctor(id: $id) {
            id
            name
          }
        }
      `;
    const input = {
      id: id,
    };

    const response = await request
      .post("/graphql")
      .send({ query: GET_BY_ID_DOCTOR, variables: input });

    expect(response.status).toBe(200);
    expect(response.body.data.getByIdDoctor).toBeDefined();
  });

  it("should update doctor", async () => {
    const UPDATE_DOCTOR = `
        mutation UpdateDoctor($id: ID!, $input: CreateDoctorInput!) {
          updateDoctor(id: $id, input: $input)
        }
      `;
    const input = {
      id: id,
      input: {
        name: "Doctor Change",
      },
    };

    const response = await request
      .post("/graphql")
      .send({ query: UPDATE_DOCTOR, variables: input });

    expect(response.status).toBe(200);
    expect(response.body.data.updateDoctor).toBeDefined();
  });

  it("should delete doctor", async () => {
    const DELETE_DOCTOR = `
        mutation DeleteDoctor($id: ID!) {
          deleteDoctor(id: $id)
        }
    `;

    const input = {
      id: id,
    };

    const response = await request
      .post("/graphql")
      .send({ query: DELETE_DOCTOR, variables: input });

    expect(response.status).toBe(200);
  });
});
