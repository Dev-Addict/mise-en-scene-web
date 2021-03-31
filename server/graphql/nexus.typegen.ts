/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import { MainContext } from "./main.context"
import { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    authKey<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "AuthKey";
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Date";
    email<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Email";
    json<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "JSON";
    name<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Name";
    password<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Password";
    username<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Username";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    authKey<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "AuthKey";
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Date";
    email<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Email";
    json<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "JSON";
    name<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Name";
    password<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Password";
    username<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Username";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CheckEmailData: { // input type
    email: NexusGenScalars['Email']; // Email!
  }
  CheckUsernameData: { // input type
    username: NexusGenScalars['Username']; // Username!
  }
  FollowData: { // input type
    following: string; // ID!
  }
  SignInData: { // input type
    authKey: NexusGenScalars['AuthKey']; // AuthKey!
    password: NexusGenScalars['Password']; // Password!
  }
  SignUpData: { // input type
    avatar?: NexusGenScalars['Upload'] | null; // Upload
    bio?: string | null; // String
    birthday?: NexusGenScalars['Date'] | null; // Date
    displayName?: string | null; // String
    email: NexusGenScalars['Email']; // Email!
    firstname?: NexusGenScalars['Name'] | null; // Name
    gender?: NexusGenEnums['Gender'] | null; // Gender
    lastname?: NexusGenScalars['Name'] | null; // Name
    password: NexusGenScalars['Password']; // Password!
    username: NexusGenScalars['Username']; // Username!
  }
}

export interface NexusGenEnums {
  Gender: "CUSTOM" | "FEMALE" | "MALE"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  AuthKey: any
  Date: any
  Email: any
  JSON: any
  Name: any
  Password: any
  Upload: any
  Username: any
}

export interface NexusGenObjects {
  AuthResponse: { // root type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Gif: { // root type
    giphyId: string; // ID!
    height: number; // Int!
    id: string; // ID!
    title: string; // String!
    url: string; // String!
    width: number; // Int!
  }
  Mutation: {};
  Query: {};
  User: { // root type
    avatar: string; // String!
    bio?: string | null; // String
    birthday?: NexusGenScalars['Date'] | null; // Date
    displayName?: string | null; // String
    email: NexusGenScalars['Email']; // Email!
    firstname?: NexusGenScalars['Name'] | null; // Name
    gender?: NexusGenEnums['Gender'] | null; // Gender
    id: string; // ID!
    lastname?: NexusGenScalars['Name'] | null; // Name
    username: NexusGenScalars['Username']; // Username!
  }
  UserFollow: { // root type
    follower: string; // ID!
    following: string; // ID!
    id: string; // ID!
  }
  UsersResponse: { // root type
    docs: NexusGenRootTypes['User'][]; // [User!]!
    limit: number; // Int!
    page: number; // Int!
    results: number; // Int!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  AuthResponse: { // field return type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Gif: { // field return type
    giphyId: string; // ID!
    height: number; // Int!
    id: string; // ID!
    title: string; // String!
    url: string; // String!
    width: number; // Int!
  }
  Mutation: { // field return type
    checkEmail: boolean; // Boolean!
    checkUsername: boolean; // Boolean!
    follow: NexusGenRootTypes['UserFollow']; // UserFollow!
    signIn: NexusGenRootTypes['AuthResponse']; // AuthResponse!
    signUp: NexusGenRootTypes['AuthResponse']; // AuthResponse!
    unfollow: NexusGenRootTypes['UserFollow'] | null; // UserFollow
  }
  Query: { // field return type
    findGifs: NexusGenRootTypes['Gif'][]; // [Gif!]!
    findUser: NexusGenRootTypes['User'] | null; // User
    self: NexusGenRootTypes['User']; // User!
    trendingGifs: NexusGenRootTypes['Gif'][]; // [Gif!]!
    userById: NexusGenRootTypes['User'] | null; // User
    users: NexusGenRootTypes['UsersResponse'] | null; // UsersResponse
  }
  User: { // field return type
    avatar: string; // String!
    bio: string | null; // String
    birthday: NexusGenScalars['Date'] | null; // Date
    displayName: string | null; // String
    email: NexusGenScalars['Email']; // Email!
    firstname: NexusGenScalars['Name'] | null; // Name
    followers: number; // Int!
    followersData: NexusGenRootTypes['UserFollow']; // UserFollow!
    followings: number; // Int!
    followingsData: NexusGenRootTypes['UserFollow']; // UserFollow!
    gender: NexusGenEnums['Gender'] | null; // Gender
    id: string; // ID!
    isFollowed: boolean; // Boolean!
    lastname: NexusGenScalars['Name'] | null; // Name
    username: NexusGenScalars['Username']; // Username!
  }
  UserFollow: { // field return type
    follower: string; // ID!
    followerData: NexusGenRootTypes['User']; // User!
    following: string; // ID!
    followingData: NexusGenRootTypes['User']; // User!
    id: string; // ID!
  }
  UsersResponse: { // field return type
    docs: NexusGenRootTypes['User'][]; // [User!]!
    limit: number; // Int!
    page: number; // Int!
    results: number; // Int!
  }
}

export interface NexusGenFieldTypeNames {
  AuthResponse: { // field return type name
    token: 'String'
    user: 'User'
  }
  Gif: { // field return type name
    giphyId: 'ID'
    height: 'Int'
    id: 'ID'
    title: 'String'
    url: 'String'
    width: 'Int'
  }
  Mutation: { // field return type name
    checkEmail: 'Boolean'
    checkUsername: 'Boolean'
    follow: 'UserFollow'
    signIn: 'AuthResponse'
    signUp: 'AuthResponse'
    unfollow: 'UserFollow'
  }
  Query: { // field return type name
    findGifs: 'Gif'
    findUser: 'User'
    self: 'User'
    trendingGifs: 'Gif'
    userById: 'User'
    users: 'UsersResponse'
  }
  User: { // field return type name
    avatar: 'String'
    bio: 'String'
    birthday: 'Date'
    displayName: 'String'
    email: 'Email'
    firstname: 'Name'
    followers: 'Int'
    followersData: 'UserFollow'
    followings: 'Int'
    followingsData: 'UserFollow'
    gender: 'Gender'
    id: 'ID'
    isFollowed: 'Boolean'
    lastname: 'Name'
    username: 'Username'
  }
  UserFollow: { // field return type name
    follower: 'ID'
    followerData: 'User'
    following: 'ID'
    followingData: 'User'
    id: 'ID'
  }
  UsersResponse: { // field return type name
    docs: 'User'
    limit: 'Int'
    page: 'Int'
    results: 'Int'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    checkEmail: { // args
      data: NexusGenInputs['CheckEmailData']; // CheckEmailData!
    }
    checkUsername: { // args
      data: NexusGenInputs['CheckUsernameData']; // CheckUsernameData!
    }
    follow: { // args
      data: NexusGenInputs['FollowData']; // FollowData!
    }
    signIn: { // args
      data: NexusGenInputs['SignInData']; // SignInData!
    }
    signUp: { // args
      data: NexusGenInputs['SignUpData']; // SignUpData!
    }
    unfollow: { // args
      data: NexusGenInputs['FollowData']; // FollowData!
    }
  }
  Query: {
    findGifs: { // args
      limit?: number | null; // Int
      page?: number | null; // Int
      query: string; // String!
    }
    findUser: { // args
      filter?: NexusGenScalars['JSON'] | null; // JSON
    }
    trendingGifs: { // args
      limit?: number | null; // Int
      page?: number | null; // Int
    }
    userById: { // args
      id?: string | null; // ID
    }
    users: { // args
      filter?: NexusGenScalars['JSON'] | null; // JSON
      limit?: number | null; // Int
      page?: number | null; // Int
      sort?: string | null; // String
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: MainContext;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}