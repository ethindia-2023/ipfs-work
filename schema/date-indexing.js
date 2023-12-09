const mongoose = require("mongoose");
const { Schema, model } = mongoose;

class dateindexingSchemaClass {
  constructor() {
    this.schema = new Schema(
      {
        Pages: [{ type: Schema.Types.ObjectId, ref: "activepageviews" }],
        AppID: { type: String, required: true },
      },
      {
        timestamps: true,
      }
    );
  }
}
const dateindexingClass = new dateindexingSchemaClass();
module.exports = dateindexingClass.schema
