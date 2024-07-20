import supertest from "supertest";

import { startServer } from "../src/testServer";

describe("Appointment API", () => {
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

  it("Should create a new appointment", async () => {
    const CREATE_APPOINTMENT = `
        mutation CreateAppointment($input: CreateAppointmentInput!) {
          createAppointment(input: $input) {
            id
            date
            reason
            notes
          }
        }
      `;
    const input = {
      input: {
        doctorId: "e6447211-0879-4bfd-9a0e-9d26ca32b677",
        patientId: "882c5208-6c8c-43ed-b3af-8e9834aa6ce4",
        date: "2024-07-21T10:00:00Z",
        reason: "Regular Checkup",
        notes: "N/A",
      },
    };

    const response = await request
      .post("/graphql")
      .send({ query: CREATE_APPOINTMENT, variables: input });

    if (response.status !== 200) {
      console.error("Error response:", response.body);
    }

    expect(response.status).toBe(200);
    expect(response.body.data.createAppointment).toBeDefined();
    expect(response.body.data.createAppointment.reason).toBe("Regular Checkup");
    id = response.body.data.createAppointment.id; // Store the ID

    console.log("ID: ", id);
  });

  it("should return all appointments", async () => {
    const GET_ALL_APPOINTMENTS = `
        query GetAllAppointments {
          getAllAppointments {
            appointments {
              id
              date
              reason
              notes
            }
            total
            limit
            page
          }
        }
      `;

    const response = await request.post("/graphql").send({
      query: GET_ALL_APPOINTMENTS,
    });

    expect(response.status).toBe(200);
    expect(response.body.data.getAllAppointments).toBeDefined();
  });

  it("should update appointment", async () => {
    const UPDATE_APPOINTMENT = `
        mutation UpdateAppointment($id: ID!, $input: CreateAppointmentInput!) {
          updateAppointment(id: $id, input: $input)
        }
      `;
    const input = {
      id: id,
      input: {
        doctorId: "e6447211-0879-4bfd-9a0e-9d26ca32b677",
        patientId: "882c5208-6c8c-43ed-b3af-8e9834aa6ce4",
        date: "2024-07-22T10:00:00Z",
        reason: "Follow-up Checkup",
        notes: "N/A",
      },
    };

    const response = await request
      .post("/graphql")
      .send({ query: UPDATE_APPOINTMENT, variables: input });

    expect(response.status).toBe(200);
    expect(response.body.data.updateAppointment).toBeDefined();
  });

  it("should delete appointment", async () => {
    const DELETE_APPOINTMENT = `
        mutation DeleteAppointment($id: ID!) {
          deleteAppointment(id: $id)
        }
    `;

    const input = {
      id: id,
    };

    const response = await request
      .post("/graphql")
      .send({ query: DELETE_APPOINTMENT, variables: input });

    expect(response.status).toBe(200);
  });
});
