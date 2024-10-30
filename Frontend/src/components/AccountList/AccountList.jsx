import PropTypes from "prop-types";
import Button from "../Button/Button";
import accountsData from "../../data/account.json";

const AccountList = () => {
  return (
    <section className="accounts">
      {accountsData.map((account, index) => (
        <div key={account.id || index} className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">{account.title}</h3>
            <p className="account-amount">{account.amount}</p>
            <p className="account-amount-description">{account.description}</p>
          </div>
          <div className="account-content-wrapper cta">
            <Button
              className={"transaction-button"}
              buttonText={"View transactions"}
            />
          </div>
        </div>
      ))}
    </section>
  );
};

// Validation des props avec PropTypes
AccountList.propTypes = {
  accountsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
};

export default AccountList;
