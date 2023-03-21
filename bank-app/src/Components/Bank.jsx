import AccountList from './Account/AccountList';
import AccountSummary from './Account/AccountSummary';
import AddNewAccount from './Account/AddNewAccount';

const Bank = () => {
  return (
    <>
    <div>
      <AccountSummary />
      <AddNewAccount />
      <AccountList />
    </div>
    </>
  );
};

export default Bank;
