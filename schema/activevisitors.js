const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const PageViewsScheme = require("./pageviews");

class ActivePageViewsSchemeClass {
  constructor() {
    this.Schema = new Schema(
      {
        page: { type: String, required: true },
        publicKeys: { type: Array, required: true, timestamps: true },
        counter: {
          type: Schema.Types.ObjectId,
          ref: "pageviews",
          default: PageViewsScheme.create({}),
          required: true,
        },
        AppID: { type: String, required: true },
      },
      {
        timestamps: true,
      }
    );
  }
}
const ActivePageViewsScheme = new ActivePageViewsSchemeClass();
module.exports = model("activepageviews", ActivePageViewsScheme.Schema);
