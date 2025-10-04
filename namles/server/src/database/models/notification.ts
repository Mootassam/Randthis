import mongoose from "mongoose";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("notification");
  } catch (error) {
    // continue, because model doesnt exist
  }

  const NotificationSchema = new Schema(
    {
      type: {
        type: String,
        enum: [
          "deposit_success", 
          "deposit_canceled", 
          "withdraw_success", 
          "withdraw_canceled", 
          "system", 
          "alert"
        ],
        required: true,
      },
      status: {
        type: String,
        enum: ["unread", "read"],
        default: "unread",
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      transaction: {
        type: Schema.Types.ObjectId,
        ref: "transaction",
      },
      amount: {
        type: String,
        required: true,
      },
      tenant: {
        type: Schema.Types.ObjectId,
        ref: "tenant",
        required: true,
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    },
    { timestamps: true }
  );

  NotificationSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  NotificationSchema.set("toJSON", {
    getters: true,
  });

  NotificationSchema.set("toObject", {
    getters: true,
  });

  return database.model("notification", NotificationSchema);
};