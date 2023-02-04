import User, { IUser } from "../models/User";
import { Request, Response } from "express";

// CRUD Operations: Create, Read, Update, Delete

// @desc Get a user
// @route GET /user
// @access Private
const getUser = async (req: Request, res: Response) => {
    const { query } = req;
    const { id } = query;

    // If there is no idea, return all the users
    if (!id) {
        const users = await User.find({}).lean().exec();
        return res.json(users);
    }

    if (!id) {
        return res.status(400).json({ message: "No ID received" });
    }

    const user = await User.findOne({ id }).lean().exec();

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
    const { id, roles, login }: IUser = req.body;

    // Confirm the data
    if (!id || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const duplicate = await User.findOne({ id }).lean().exec();

    // If there is a duplicate, throw a 409 error
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate job" });
    }

    // Create the user object to add to the database
    const userObject: IUser = { id, roles, login };

    const user = await User.create(userObject);

    if (user) {
        res.status(201).json({ message: "New user created" });
    } else {
        res.status(400).json({ message: "Invalid user data received" });
    }
};

// @desc Update a user
// @route PATCH /user
// @access Private
const updateUser = async (req: Request, res: Response) => {
    // Get data from request body
    const { id, roles, login } = req.body;

    // Check inputs 
    if (!id || !login || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Confirm that the user to be updated exists
    const user = await User.findOne({ id }).exec();

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    // Update the roles list
    user.roles = roles;
    user.login = login;

    const updatedUser = await user.save();

    res.json(`${updatedUser} user updated`);
};

// @desc Delete a user
// @route DELETE /user
// @access Private
const deleteUser = async (req: Request, res: Response) => {
    const { id }: { id: string } = req.body;
    if (!id) {
        return res.status(400).json({ message: "User id required" });
    }

    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: "User not found " });
    }

    const result = await user.deleteOne();

    const reply: string = `User ${result.id} with ID ${result._id} deleted`;

    res.json(reply);
};

export { getUser, createNewUser, updateUser, deleteUser };
