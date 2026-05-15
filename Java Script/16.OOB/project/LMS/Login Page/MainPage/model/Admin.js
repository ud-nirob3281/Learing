import { user } from './user.js';

export class Admin extends user {
  constructor(email, password) {
    super(email, password);
  }
  getRole() {
    return 'Admin';
  }
}
