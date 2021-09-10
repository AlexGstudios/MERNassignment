const AuthService = async (action, method, data) => {
  const _unAuthorizedUserObject = {
    isAuthenticated: false,
    user: { _id: null, username: "" },
    message: { msgBody: "Not authorized", msgError: true },
  };

  const _dataObject = (method) => {
    if(method){
        return {
          method: method,
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" }
        }
    }
    return undefined;
  }

  try {
    const res = await fetch(`/api/${action}`, _dataObject(method));
    if (res.status !== 401) {
      const data = await res.json();
      return data;
    } else {
      return _unAuthorizedUserObject;
    }
  } catch (error) {
    return { error };
  }
};

export default AuthService;