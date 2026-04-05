export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Finance Data Processing API",
    version: "1.0.0",
    description: "API Documentation for Finance Dashboard project"
  },
  servers: [
    { url: "/api", description: "Local API" }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  security: [{ bearerAuth: [] }],
  paths: {
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a new user",
        security: [],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { type: "object", properties: { email: { type: "string" }, password: { type: "string" } } } } }
        },
        responses: { 201: { description: "Created" } }
      }
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login and get token",
        security: [],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { type: "object", properties: { email: { type: "string" }, password: { type: "string" } } } } }
        },
        responses: { 200: { description: "Success" } }
      }
    },
    "/users": {
      get: { tags: ["Users"], summary: "Get all users (ADMIN only)", responses: { 200: { description: "Success" } } }
    },
    "/users/{id}/role": {
      put: {
        tags: ["Users"],
        summary: "Update user role (ADMIN only)",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", properties: { role: { type: "string", enum: ["VIEWER", "ANALYST", "ADMIN"] } } } } } },
        responses: { 200: { description: "Success" } }
      }
    },
    "/transactions": {
      get: {
        tags: ["Transactions"],
        summary: "Get transactions",
        parameters: [
          { name: "type", in: "query", required: false, schema: { type: "string" } },
          { name: "category", in: "query", required: false, schema: { type: "string" } }
        ],
        responses: { 200: { description: "Success" } }
      },
      post: {
        tags: ["Transactions"],
        summary: "Create a transaction (ADMIN only)",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { type: "object", properties: { amount: { type: "number" }, type: { type: "string" }, category: { type: "string" }, date: { type: "string" } } } } }
        },
        responses: { 201: { description: "Created" } }
      }
    },
    "/transactions/{id}": {
      put: {
        tags: ["Transactions"],
        summary: "Update transaction (ADMIN only)",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Success" } }
      },
      delete: {
        tags: ["Transactions"],
        summary: "Delete transaction (ADMIN only)",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 204: { description: "No content" } }
      }
    },
    "/dashboard/summary": {
      get: { tags: ["Dashboard"], summary: "Get net balance and totals", responses: { 200: { description: "Success" } } }
    },
    "/dashboard/categories": {
      get: { tags: ["Dashboard"], summary: "Get amount total by categories", responses: { 200: { description: "Success" } } }
    },
    "/dashboard/recent-activity": {
      get: { tags: ["Dashboard"], summary: "Get recent transactions", responses: { 200: { description: "Success" } } }
    },
    "/dashboard/trends": {
      get: { tags: ["Dashboard"], summary: "Get monthly trends", responses: { 200: { description: "Success" } } }
    }
  }
};
