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
  SignInData: { // input type
    authKey: NexusGenScalars['AuthKey']; // AuthKey!
    password: NexusGenScalars['Password']; // Password!
  }
  SignUpData: { // input type
    avatar?: NexusGenScalars['Upload'] | null; // Upload
    bio?: string | null; // String
    birthday?: NexusGenScalars['Date'] | null; // Date
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
  Mutation: {};
  Query: {};
  User: { // root type
    avatar: string; // String!
    bio?: string | null; // String
    birthday?: NexusGenScalars['Date'] | null; // Date
    email: NexusGenScalars['Email']; // Email!
    firstname?: NexusGenScalars['Name'] | null; // Name
    gender?: NexusGenEnums['Gender'] | null; // Gender
    id: string; // ID!
    lastname?: NexusGenScalars['Name'] | null; // Name
    username: NexusGenScalars['Username']; // Username!
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
  Mutation: { // field return type
    self: NexusGenRootTypes['User'] | null; // User
    signIn: NexusGenRootTypes['AuthResponse'] | null; // AuthResponse
    signUp: NexusGenRootTypes['AuthResponse'] | null; // AuthResponse
  }
  Query: { // field return type
    ok: boolean; // Boolean!
  }
  User: { // field return type
    avatar: string; // String!
    bio: string | null; // String
    birthday: NexusGenScalars['Date'] | null; // Date
    email: NexusGenScalars['Email']; // Email!
    firstname: NexusGenScalars['Name'] | null; // Name
    gender: NexusGenEnums['Gender'] | null; // Gender
    id: string; // ID!
    lastname: NexusGenScalars['Name'] | null; // Name
    username: NexusGenScalars['Username']; // Username!
  }
}

export interface NexusGenFieldTypeNames {
  AuthResponse: { // field return type name
    token: 'String'
    user: 'User'
  }
  Mutation: { // field return type name
    self: 'User'
    signIn: 'AuthResponse'
    signUp: 'AuthResponse'
  }
  Query: { // field return type name
    ok: 'Boolean'
  }
  User: { // field return type name
    avatar: 'String'
    bio: 'String'
    birthday: 'Date'
    email: 'Email'
    firstname: 'Name'
    gender: 'Gender'
    id: 'ID'
    lastname: 'Name'
    username: 'Username'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    signIn: { // args
      data: NexusGenInputs['SignInData']; // SignInData!
    }
    signUp: { // args
      data: NexusGenInputs['SignUpData']; // SignUpData!
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