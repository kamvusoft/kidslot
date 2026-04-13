function init() {
    const user = new User("John Doe", "john.doe@example.com");
    console.log(user.getInfo());
}

window.onload = init;