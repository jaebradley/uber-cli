import inquirer from 'inquirer';

const validatePassword = (password) => {
  if (password && password.length > 0) {
    return true;
  }

  return 'Insert valid password';
};


const promptUberAPIToken = () => (
  inquirer.prompt([
    {
      name: 'uberAPIToken',
      message: 'Enter your Uber API Token',
      validate: validatePassword,
      type: 'password',
    },
  ])
);


const promptGoogleMapsAPIToken = () => (
  inquirer.prompt([
    {
      name: 'googleMapsAPIToken',
      message: 'Enter your Google Maps API Token',
      validate: validatePassword,
      type: 'password',
    },
  ])
);

export {
  promptUberAPIToken,
  promptGoogleMapsAPIToken,
};
