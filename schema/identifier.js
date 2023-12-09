const mongoose = require("mongoose");
const { Schema, model } = mongoose;

class IdentifierSchemaClass {
  constructor() {
    this.schema = new Schema(
      {
        AuthToken: { type: String, required: true },
        Logs: [
          {
            CID: { type: String, required: true },
            timestamp: { type: Date, default: Date.now },
          },
        ],
        AppID: { type: String, required: true },
      },
      {
        timestamps: true,
      }
    );
  }
}

const identitifierClass = new IdentifierSchemaClass();
module.exports = identitifierClass.schema;
