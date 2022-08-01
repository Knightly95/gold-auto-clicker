const saveUserList = map =>
  localStorage.setItem('userList', JSON.stringify(Array.from(map.entries())));
const saveCurrentUser = user =>
  localStorage.setItem('currentUser', JSON.stringify(user));

export const getUserList = () => {
  const userList = localStorage.getItem('userList');
  if (userList) {
    return new Map(JSON.parse(userList));
  }
  return new Map();
};

export const getCurrentUser = () => {
  const currentUser = localStorage.getItem('currentUser');
  return currentUser ? JSON.parse(currentUser) : [];
};

export const setUserList = user => {
  const userList = getUserList();
  userList.set(user.username, user);
  saveUserList(userList);
  saveCurrentUser(user);
};

export const getUser = user => {
  const userList = getUserList();
  return userList.get(user.username);
};

export const loginUser = username => {
  const userList = getUserList();
  const existingUser = userList.get(username);
  if (existingUser) {
    setUserList(existingUser);
  } else {
    const newUser = {
      username,
      clicks: 0,
      autoclicker: {
        baseCost: 10,
        cost: 10,
        power: 1,
        amount: 0,
      },
      clickPower: 1,
    };
    setUserList(newUser);
  }
};
