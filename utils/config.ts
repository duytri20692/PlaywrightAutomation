interface EnvironmentConfig {
  baseURL: string;
  credentials: {
    valid: {
      email: string;
      password: string;
    };
    invalid: {
      email: string;
    };
  };
}

export const config: { [key: string]: EnvironmentConfig } = {
  test: {
    baseURL: 'https://reqres.in/api',
    credentials: {
      valid: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      },
      invalid: {
        email: 'eve.holt@reqres.in',
        password: 'wrongpassword'
      }
    }
  },
  stage: {
    baseURL: 'https://reqres.in/api',
    credentials: {
      valid: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      },
      invalid: {
        email: 'peter@klaven'
      }
    }
  }
};