// Entities/User.js
export class User {
  static async me() {
    // Simulate fetching a user
    return Promise.resolve({ full_name: 'Guest User' });
  }
}
