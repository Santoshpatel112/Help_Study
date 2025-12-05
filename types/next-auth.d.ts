import 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user?: {
      id: number;
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      gender: string;
      image: string;
      token?: string;
    };
  }

  interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    token?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    user?: {
      id: number;
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      gender: string;
      image: string;
      token?: string;
    };
  }
}
