import supertest from "supertest";
import { startServer } from "../src/testServer";

describe("Patient API", () => {
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

  it("Should create a new patient", async () => {
    const CREATE_PATIENT = `
        mutation CreatePatient($input: CreatePatientInput!) {
          createPatient(input: $input) {
            id
            firstName
            lastName
            dateOfBirth
            gender
            contactInfo {
              phone
              email
            }
          }
        }
      `;
    const input = {
      input: {
        firstName: "John",
        lastName: "Doe",
        dateOfBirth: "1990-01-01",
        gender: "Male",
        contactInfo: {
          phone: "1234567890",
          email: "test@gmail.com",
        },
      },
    };

    const response = await request
      .post("/graphql")
      .send({ query: CREATE_PATIENT, variables: input });

    if (response.status !== 200) {
      console.error("Error response:", response.body);
    }

    expect(response.status).toBe(200);
    expect(response.body.data.createPatient).toBeDefined();
    expect(response.body.data.createPatient.firstName).toBe("John");
    expect(response.body.data.createPatient.lastName).toBe("Doe");
    expect(response.body.data.createPatient.dateOfBirth).toBe("1990-01-01");
    expect(response.body.data.createPatient.gender).toBe("Male");
    expect(response.body.data.createPatient.contactInfo.phone).toBe(
      "1234567890",
    );
    expect(response.body.data.createPatient.contactInfo.email).toBe(
      "test@gmail.com",
    );

    id = response.body.data.createPatient.id; // Store the ID
    console.log("ID: ", id);
  });

  it("should return all patients", async () => {
    const GET_ITEMS = `
        query GetAllPatients {
          getAllPatients {
            patients {
              id
              firstName
              lastName
              dateOfBirth
            }
          }
        }
      `;

    const response = await request.post("/graphql").send({ query: GET_ITEMS });

    expect(response.status).toBe(200);
    expect(response.body.data.getAllPatients).toBeDefined();
  });

  it("Should getBy ID a new patient", async () => {
    const GET_BY_ID_PATIENT = `
        query GetByIdPatient($id: ID!) {
          getByIdPatient(id: $id) {
            id
            firstName
            lastName
            dateOfBirth
            gender
            contactInfo {
              phone
              email
            }
          }
        }
    `;
    const input = {
      id: id, // Use the stored ID
    };

    const response = await request
      .post("/graphql")
      .send({ query: GET_BY_ID_PATIENT, variables: input });

    if (response.status !== 200) {
      console.error("Error response:", response.body);
    }

    expect(response.status).toBe(200);
    expect(response.body.data.getByIdPatient).toBeDefined();
  });

  it("Should update a new patient", async () => {
    const UPDATE_PATIENT = `
        mutation UpdatePatient($id: ID!, $input: CreatePatientInput!) {
          updatePatient(id: $id, input: $input)
        }
    `;

    const input = {
      id: id, // Use the stored ID
      input: {
        firstName: "John Change",
        lastName: "Doe Change",
        dateOfBirth: "1999-01-01",
        gender: "Male",
        contactInfo: {
          phone: "1234567890",
          email: "fajarvuana@gmail.com",
        },
      },
    };

    const response = await request
      .post("/graphql")
      .send({ query: UPDATE_PATIENT, variables: input });

    if (response.status !== 200) {
      console.error("Error response:", response.body);
    }

    expect(response.status).toBe(200);
    expect(response.body.data.updatePatient).toBeDefined();
  });

  // it("Should delete a new patient", async () => {
  //   const DELETE_PATIENT = `
  //       mutation DeletePatient($id: ID!) {
  //         deletePatient(id: $id)
  //       }
  //   `;

  //   const input = {
  //     id: id, // Use the stored ID
  //   };

  //   const response = await request
  //     .post("/graphql")
  //     .send({ query: DELETE_PATIENT, variables: input });

  //   if (response.status !== 200) {
  //     console.error("Error response:", response.body);
  //   }

  //   expect(response.status).toBe(200);
  // });
});
