import { type OpenAPIV3_1 } from "openapi-types";

const openApiSpec: OpenAPIV3_1.Document = {
  openapi: "3.1.0",
  info: {
    title: "Aigent Directory API",
    description: "API for managing AI tools and agents directory",
    version: "1.0.0",
  },
  servers: [
    {
      url: "https://aigent.rohi.dev/api",
      description: "Production server",
    },
    {
      url: "http://localhost:3000/api",
      description: "Local development server",
    },
  ],
  paths: {
    "/new": {
      post: {
        summary: "Add a new tool or agent",
        description: "Add a new tool or agent to the directory",
        security: [{ UnkeyAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: [
                  "name",
                  "description",
                  "category",
                  "href",
                  "tags",
                  "type",
                ],
                properties: {
                  name: {
                    type: "string",
                    description: "Name of the tool or agent",
                  },
                  description: {
                    type: "string",
                    description: "Description of the tool or agent",
                  },
                  category: {
                    type: "string",
                    description: "Category of the tool or agent",
                  },
                  href: {
                    type: "string",
                    format: "uri",
                    description: "URL of the tool or agent",
                  },
                  avatar: {
                    type: "string",
                    format: "uri",
                    description: "Avatar URL of the tool or agent",
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                    description: "Tags associated with the tool or agent",
                  },
                  type: {
                    type: "string",
                    enum: ["tool", "agent"],
                    default: "tool",
                    description: "Type of the item",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Successfully added new item",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "integer",
                      },
                      name: {
                        type: "string",
                      },
                      description: {
                        type: "string",
                      },
                      category: {
                        type: "string",
                      },
                      href: {
                        type: "string",
                      },
                      avatar: {
                        type: "string",
                      },
                      tags: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      type: {
                        type: "string",
                        enum: ["tool", "agent"],
                      },
                      createdAt: {
                        type: "integer",
                      },
                      updatedAt: {
                        type: "integer",
                      },
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Invalid request body",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          "403": {
            description: "Unauthorized - Invalid API key",
          },
        },
      },
    },
    "/expire": {
      post: {
        summary: "Expire cache tags",
        description: "Expire the items cache tag to refresh data",
        security: [{ UnkeyAuth: [] }],
        responses: {
          "200": {
            description: "Successfully expired cache",
          },
          "403": {
            description: "Unauthorized - Invalid API key",
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      UnkeyAuth: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "Unkey API key for authentication",
      },
    },
  },
};

export async function GET() {
  return Response.json(openApiSpec);
}
