import bcrypt from "bcrypt";
import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";
import { PASSWORD_MESSAGE, PASSWORD_REGEX } from "@/lib/password";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    paymentMethod: {
      type: { type: String, enum: ["Visa", "Master Card"] },
      cardNumber: { type: String },
    },
    location: {
      street: { type: String },
      postalCode: { type: Number },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => PASSWORD_REGEX.test(value),
        message: () => PASSWORD_MESSAGE,
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.method("checkPassword", function (password: string) {
  return bcrypt.compare(password, this.password as string);
});

type UserSchemaType = InferSchemaType<typeof userSchema>;

export type UserDoc = UserSchemaType & {
  checkPassword(password: string): Promise<boolean>;
};

export const UserModel: Model<UserDoc> =
  (models.User as Model<UserDoc>) ?? model<UserDoc>("User", userSchema);
