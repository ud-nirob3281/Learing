export class user {
  constructor(name, password) {
    this.name = name;
    this.password = password;
  }
  getRole() {
    return 'User';
  }
}
