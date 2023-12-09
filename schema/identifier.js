const mongoose = require("mongoose");
const { Schema, model } = mongoose;

class IdentifierSchemaClass {
  constructor() {
    this.schema = new Schema({
      AuthToken: { type: String, required: true },
      Logs: [{ type: Schema.Types.ObjectId, ref: "dateindexing" }],
    },
    {
      timestamps: true,
    });
  }
}

const identitifierClass = new IdentifierSchemaClass();
module.exports = model("Identifier", identitifierClass.schema);
