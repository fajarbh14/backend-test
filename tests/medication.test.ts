import supertest from "supertest";

import { startServer } from "../src/testServer";

describe("Medication API", () => {
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

  it("Should create a new medication", async () => {
    const CREATE_MEDICATION = `
        mutation CreateMedication($input: CreateMedicationInput!) {
          createMedication(input: $input) {
            id
            name
            dosage
            frequency
          }
        }
      `;
    const input = {
      input: {
        patientId: "882c5208-6c8c-43ed-b3af-8e9834aa6ce4",
        name: "Ibuprofen",
        dosage: "200mg",
        frequency: "Twice a day",
      },
    };

    const response = await request
      .post("/graphql")
      .send({ query: CREATE_MEDICATION, variables: input });

    if (response.status !== 200) {
      console.error("Error response:", response.body);
    }

    expect(response.status).toBe(200);
    expect(response.body.data.createMedication).toBeDefined();
    expect(response.body.data.createMedication.name).toBe("Ibuprofen");
    id = response.body.data.createMedication.id; // Store the ID

    console.log("ID: ", id);
  });

  it("should return all medications", async () => {
    const GET_ALL_MEDICATIONS = `
        query GetAllMedications {
          getAllMedications {
            medications {
              id
              name
              dosage
              frequency
            }
            total
            limit
            page
          }
        }
      `;

    const response = await request.post("/graphql").send({
      query: GET_ALL_MEDICATIONS,
    });

    expect(response.status).toBe(200);
    expect(response.body.data.getAllMedications).toBeDefined();
  });

  it("should get medication by ID", async () => {
    const GET_BY_ID_MEDICATION = `
        query GetByIdMedication($id: ID!) {
          getByIdMedication(id: $id) {
            id
            name
            dosage
            frequency
          }
        }
      `;
    const input = {
      id: id,
    };

    const response = await request
      .post("/graphql")
      .send({ query: GET_BY_ID_MEDICATION, variables: input });

    expect(response.status).toBe(200);
    expect(response.body.data.getByIdMedication).toBeDefined();
  });

  it("should update medication", async () => {
    const UPDATE_MEDICATION = `
        mutation UpdateMedication($id: ID!, $input: CreateMedicationInput!) {
          updateMedication(id: $id, input: $input)
        }
      `;
    const input = {
      id: id,
      input: {
        patientId: "882c5208-6c8c-43ed-b3af-8e9834aa6ce4",
        name: "Ibuprofen",
        dosage: "400mg",
        frequency: "Once a day",
      },
    };

    const response = await request
      .post("/graphql")
      .send({ query: UPDATE_MEDICATION, variables: input });

    expect(response.status).toBe(200);
    expect(response.body.data.updateMedication).toBeDefined();
  });

  it("should delete medication", async () => {
    const DELETE_MEDICATION = `
        mutation DeleteMedication($id: ID!) {
          deleteMedication(id: $id)
        }
    `;

    const input = {
      id: id,
    };

    const response = await request
      .post("/graphql")
      .send({ query: DELETE_MEDICATION, variables: input });

    expect(response.status).toBe(200);
  });
});
