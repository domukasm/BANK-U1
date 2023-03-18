import React from "react";

const FilterUsers = ({ userList, setFilteredUsers }) => {
    const filterWithBalance = () => {
        console.log(userList);
        const usersWithBalance = userList.filter((user) => user.balance > 0);
        console.log(usersWithBalance);
        setFilteredUsers(usersWithBalance);
    };
    const filterWithNoBalance = () => {
        const usersWithNoBalance = userList.filter(
            (userList) => userList.balance === 0
        );
        setFilteredUsers(usersWithNoBalance);
    };
    const clearFilter = () => {
        setFilteredUsers(userList);
    };
    return (
        <div className="info">
            <button className="" onClick={filterWithBalance}>
                Bajoras Turtingas
            </button>
            <button className="" onClick={filterWithNoBalance}>
                Benamis Vargšas
            </button>
            <button className="" onClick={clearFilter}>
                Visi
            </button>
        </div>
    );
};

export default FilterUsers;