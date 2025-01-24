
const Roles = {
    ADMIN: 'admin',
    MODERATOR: 'moderator'
  };
  
  // CustomJwtSessionClaims can be represented as a plain object in JavaScript
  class CustomJwtSessionClaims {
    constructor() {
      this.metadata = {
        role: undefined // role can be either Roles.ADMIN or Roles.MODERATOR
      };
    }
  }
  
  