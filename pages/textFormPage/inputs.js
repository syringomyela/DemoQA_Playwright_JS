function getRandomInputData(length) {
  return Math.random().toString(36).substring(2, length);
}

function getRandomEmail(length) {
  return Math.random().toString(36).substring(2, length) + '@mail.com';
}

export function generateTextBoxData(length = 10) {
  return {
    name: getRandomInputData(length),
    email: getRandomEmail(length),
    fakeEmail: getRandomInputData(length),
    currentAddress: getRandomInputData(length),
    permanentAddress: getRandomInputData(length),
  };
}
