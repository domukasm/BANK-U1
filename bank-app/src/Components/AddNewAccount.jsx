import React from "react";
import { useState } from "react";
import userService from "../Services/userService";

const AddUser = ({ onBack, onAddUser }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const onFirstNameChangeHandler = (e) => {
        setFirstName(e.target.value);
    };
    const onLastNameChangeHandler = (e) => {
        setLastName(e.target.value);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        const data = {
            firstName,
            lastName,
            balance: 0,
        };
        let response = await userService.addNewUser(data);
        if (response.ok) {
            // Display a success message to the user
            alert("Paskyra pridėta sėkmingai");
        } else {
            // Handle errors
            alert("Upsy įvyko klaidauskas");
        }
        onAddUser(data);
        onBack();
    };
    return (
        <div className="info">
            <div>
                <h3>Paskyros Pridėjimas</h3>
            </div>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Vardenis:</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={onFirstNameChangeHandler}
                    ></input>
                </div>
                <div>
                    <label>Pavardenis:</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={onLastNameChangeHandler}
                    ></input>
                </div>
                <div>
                    <input type="button" value="Atgal" onClick={onBack}></input>
                    <input
                        disabled={firstName.length < 2 || lastName.length < 2}
                        type="submit"
                        value="Pridėti Paskyrą"
                    ></input>
                </div>
            </form>
        </div>
    );
};

export default AddUser;