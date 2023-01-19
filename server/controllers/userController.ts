import User, { IUser } from "../models/User";
import { Request, Response } from "express";

// CRUD Operations: Create, Read, Update, Delete

// @desc Get a user
// @route GET /user
// @access Private
const getUser = async (req: Request, res: Response) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "No ID received" });
    }

    const user = await User.findOne(id).exec();

    if (!user) {
        return res.status(400).json({ message: "No user found" });
    }

    res.json(user);
};

// @desc Create a new user
// @route POST /user
// @access Private
const createNewUser = async (req: Request, res: Response) => {
    // Get variables from the request body
    const { id, roles }: IUser = req.body;

    // Confirm the data
    if (!id || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const duplicate = await User.findOne({ id }).lean().exec();

    // If there is a duplicate, throw a 409 error
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate job" });
    }

    // Create the job object to add to the database
    const userObject: IUser = { id, roles };

    const user = await User.create(userObject);

    if (user) {
        res.status(201).json({ message: "New user created" });
    } else {
        res.status(400).json({ message: "Invalid user data received" });
    }
};

interface FullUser extends IUser {
    _id: string;
}

// @desc Update a user
// @route PATCH /user
// @access Private
const updateUser = async (req: Request, res: Response) => {
    // Get data from request body
    const {
        _id,
        roles
    } = req.body;

    // Check inputs. contributor field is immutable and should not change
    if (
        !_id ||
        !Array.isArray(roles) ||
        !roles.length
    ) {
        return res
            .status(400)
            .json({ message: 'All fields are required' });
    }

    // Confirm that the user to be updated exists
    const user = await User.findById(_id).exec();

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    // Update the job
    user.roles = roles;

    const updatedUser = await user.save();

    res.json(`${updatedUser} user updated`);
};

// @desc Delete a user
// @route DELETE /user
// @access Private
const deleteUser = async (req: Request, res: Response) => {
    const { _id }: { _id: string } = req.body;
    if (!_id) {
        return res.status(400).json({ message: "User id required" });
    }

    const user = await User.findById(_id).exec();

    if (!user) {
        return res.status(400).json({ message: "User not found " });
    }

    const result = await user.deleteOne();

    const reply: string = `User ${result.id} with ID ${result._id} deleted`;

    res.json(reply);
};

export { getUser, createNewUser, updateUser, deleteUser };
