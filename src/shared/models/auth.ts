export interface UserCredentials {
  email: string;
  password: string;
}

export interface FirebaseBasicProfile {
  displayName: string;
  email: string;
  photoURL: string;
  providerId: string;
  uid: string;
}

export interface FirebaseUserProfile extends FirebaseBasicProfile {
  emailVerified: boolean;
  isAnonymous: boolean;
  providerData: Array<FirebaseBasicProfile>;
  refreshToken: string;
}
