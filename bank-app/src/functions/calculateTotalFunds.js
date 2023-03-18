const calculateTotalFunds = (list) => {
    return list.reduce((acc, userList) => acc + userList.balance, 0);
};
export default calculateTotalFunds;