import { useState, useContext } from "react";
import { Global } from "../Global";

const AddUser = ({ onBack, onAddUser }) => {
    const {setNewAccount} = useContext(Global);
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
        setNewAccount(data)
        if (typeof onBack === "function") {
            onBack();
        }
        if (typeof onAddUser === 'function') {
            onAddUser(data);
          }
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