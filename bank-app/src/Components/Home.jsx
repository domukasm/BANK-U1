import { useState, useEffect } from "react";
import AccountList from "./AccountList";
import { dummyUserList } from "./UserData";
import AddNewAccount from "./AddNewAccount";
import calculateTotalFunds from "../functions/calculateTotalFunds";
import AccountFilter from "./AccountFilter";
import userService from "../Services/userService";
import Nav from './Nav';

const Home = () => {
    const [accountList, setAccountList] = useState(dummyUserList);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [shownPage, setShownPage] = useState("list");
    const [refresh, setRefresh] = useState(true);
    useEffect(() => {
        const fetchUsers = async () => {
            const users = await userService.fetchUsers();
            if (!users) {
                alert("Vartotojas Nerastas");
            }
            updateLists(users);
        };
        fetchUsers();
    }, [refresh]);
    const addUserClickHandler = () => {
        setShownPage("add");
    };
    const showListPage = () => {
        setShownPage("list");
    };
    const deleteUser = async (data) => {
        await userService.destroyUser(data);
        setRefresh((val) => !val);
    };
    const addUser = (data) => {
        updateLists([...accountList, data]);
        setRefresh((val) => !val);
    };
    const updateLists = (accountList) => {
        setAccountList(accountList);
        setFilteredUsers(accountList);
    };
    return (
        <>
            <article className="header">
                <header>
                    <div className="header">
                        <h1>Bitutės bankas</h1>
                    </div>
                    <div className="statistics">
                        <div className="client-number">
                        Iš viso paskyrų: {accountList.length}
                        </div>
                        <div>
                        Iš viso pinigų:{" "}
                            {calculateTotalFunds(accountList).toFixed(2)} €
                        </div>
                    </div>
                </header>
            </article>

            <Nav />

            <section className="section-content">
                {shownPage === "list" && (
                    <>
                        <input
                            type="button"
                            value="Pridėti Paskyrą"
                            onClick={addUserClickHandler}
                            className="info"
                        />
                        <AccountFilter
                            userList={accountList}
                            setFilteredUsers={setFilteredUsers}
                        />
                        <AccountList
                            list={filteredUsers}
                            onDelete={deleteUser}
                            setRefresh={setRefresh}
                        />
                    </>
                )}
                {shownPage === "add" && (
                    <AddNewAccount onBack={showListPage} onAddUser={addUser} />
                )}
            </section>
        </>
    );
};

export default Home;