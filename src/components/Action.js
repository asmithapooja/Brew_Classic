const changeScreen = (id) => {
    console.log("Changing screen, cause token has expired");
    window.location.href = `/${id}/login`;
}

export default changeScreen;