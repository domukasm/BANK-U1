const baseURL = "http://localhost:3003";

const fetchUsers = async () => {
    let response = await fetch(baseURL + "/users");
    if (response.status === 200) {
        let data = await response.json();
        return data;
    }
    return [];
};
const addNewUser = async (newUser) => {
    console.log(newUser);
    let response = await fetch(baseURL + "/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
    });
    return response;
};
const destroyUser = async (id) => {
    let response = await fetch(`${baseURL}/users/${id}`, {
        method: "DELETE",
    });

    if (response.ok) {
        // Display a success message to the user
        alert("Paskyra ištrinta sėkmingai");
    } else {
        // Handle errors
        alert("Klaida trinant vartotoja");
    }
};
const addBalance = async (id, balance) => {
    const encodedId = encodeURI(id);
    return await fetch(`${baseURL}/users/${encodedId}/balance`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ balance: parseInt(balance) }),
    });
};
const removeBalance = async (id, balance) => {
    const encodedId = encodeURI(id);
    return await fetch(`${baseURL}/users/${encodedId}/balance`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ balance: -parseInt(balance) }),
    });
};
export default {
    fetchUsers,
    addNewUser,
    destroyUser,
    addBalance,
    removeBalance,
};