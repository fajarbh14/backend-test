import supertest from "supertest";

import { startServer } from "../src/testServer";

describe("MedicalHistory API", () => {
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

  it("Should create a new medical history", async () => {
    const CREATE_MEDICAL_HISTORY = `
        mutation CreateMedicalHistory($input: CreateMedicalHistoryInput!) {
          createMedicalHistory(input: $input) {
            id
            condition
            diagnosisDate
            status
          }
        }
      `;
    const input = {
      input: {
        patientId: "882c5208-6c8c-43ed-b3af-8e9834aa6ce4",
        condition: "Diabetes",
        diagnosisDate: "2022-01-01",
        status: "Ongoing",
      },
    };

    const response = await request
      .post("/graphql")
      .send({ query: CREATE_MEDICAL_HISTORY, variables: input });

    if (response.status !== 200) {
      console.error("Error response:", response.body);
    }

    expect(response.status).toBe(200);
    expect(response.body.data.createMedicalHistory).toBeDefined();
    expect(response.body.data.createMedicalHistory.condition).toBe("Diabetes");
    expect(response.body.data.createMedicalHistory.diagnosisDate).toBe(
      "2022-01-01",
    );
    expect(response.body.data.createMedicalHistory.status).toBe("Ongoing");
    id = response.body.data.createMedicalHistory.id; // Store the ID

    console.log("ID: ", id);
  });

  it("should return all medical histories", async () => {
    const GET_ALL_MEDICAL_HISTORIES = `
        query GetAllMedicalHistories {
          getAllMedicalHistories {
            medicalHistories {
              id
              patient {
                id
                firstName
              }
              condition
              diagnosisDate
              status
            }
            total
            limit
            page
          }
        }
      `;

    const response = await request.post("/graphql").send({
      query: GET_ALL_MEDICAL_HISTORIES,
      variables: { search: "", page: 1, limit: 10 },
    });

    expect(response.status).toBe(200);
    expect(response.body.data.getAllMedicalHistories).toBeDefined();
  });

  it("should get medical history by ID", async () => {
    const GET_BY_ID_MEDICAL_HISTORY = `
        query GetByIdMedicalHistory($id: ID!) {
          getByIdMedicalHistory(id: $id) {
            condition
            diagnosisDate
            status
          }
        }
      `;
    const input = {
      id: id,
    };

    const response = await request
      .post("/graphql")
      .send({ query: GET_BY_ID_MEDICAL_HISTORY, variables: input });

    expect(response.status).toBe(200);
    expect(response.body.data.getByIdMedicalHistory).toBeDefined();
  });

  it("should update medical history", async () => {
    const UPDATE_MEDICAL_HISTORY = `
        mutation UpdateMedicalHistory($id: ID!, $input: CreateMedicalHistoryInput!) {
          updateMedicalHistory(id: $id, input: $input)
        }
      `;
    const input = {
      id: id,
      input: {
        patientId: "882c5208-6c8c-43ed-b3af-8e9834aa6ce4",
        condition: "Diabetes Type 2",
        diagnosisDate: "2022-01-01",
        status: "Managed",
      },
    };

    const response = await request
      .post("/graphql")
      .send({ query: UPDATE_MEDICAL_HISTORY, variables: input });

    expect(response.status).toBe(200);
    expect(response.body.data.updateMedicalHistory).toBeDefined();
  });

  it("should delete medical history", async () => {
    const DELETE_MEDICAL_HISTORY = `
        mutation DeleteMedicalHistory($id: ID!) {
          deleteMedicalHistory(id: $id)
        }
    `;

    const input = {
      id: id,
    };

    const response = await request
      .post("/graphql")
      .send({ query: DELETE_MEDICAL_HISTORY, variables: input });

    expect(response.status).toBe(200);
  });
});
