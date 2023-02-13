import { Schema, model } from "mongoose";

export interface IUser {
    id: string;
    roles: string[];
    login: string;
}

const userSchema = new Schema<IUser>({
    id: {
        type: String,
        required: true,
        immutable: true,
    },
    roles: {
        type: [String],
        required: true,
    },
    login: {
        type: String,
        required: true,
    }
});

export default model<IUser>("User", userSchema);
