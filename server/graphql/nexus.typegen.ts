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
    upload<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Upload";
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
    upload<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Upload";
    username<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Username";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  AcceptAdminData: { // input type
    channel: string; // ID!
  }
  AddAdminData: { // input type
    admin: string; // ID!
    channel: string; // ID!
    permissions: NexusGenEnums['ChannelAdminPermission'][]; // [ChannelAdminPermission!]!
  }
  AnnounceData: { // input type
    comment?: string | null; // ID
    gif?: string | null; // ID
    images?: NexusGenScalars['Upload'][] | null; // [Upload!]
    poll?: NexusGenInputs['AnnouncementPollData'] | null; // AnnouncementPollData
    publishAt?: NexusGenScalars['Date'] | null; // Date
    reAnnouncement?: string | null; // ID
    text?: string | null; // String
  }
  AnnouncementPollData: { // input type
    options: string[]; // [String!]!
    question: string; // String!
  }
  CheckAuthKeyData: { // input type
    authKey: NexusGenScalars['AuthKey']; // AuthKey!
  }
  CheckEmailData: { // input type
    email: NexusGenScalars['Email']; // Email!
  }
  CheckHandleData: { // input type
    handle: NexusGenScalars['Username']; // Username!
  }
  CheckUsernameData: { // input type
    username: NexusGenScalars['Username']; // Username!
  }
  CreatePostData: { // input type
    admin?: string | null; // ID
    body: NexusGenScalars['JSON']; // JSON!
    channel: string; // ID!
    cover?: string | null; // ID
    description?: string | null; // String
    publishAt?: NexusGenScalars['Date'] | null; // Date
    published?: boolean | null; // Boolean
    subtitle?: string | null; // String
    tags?: string[] | null; // [String!]
    title: string; // String!
  }
  EditAdminPermissionsData: { // input type
    admin: string; // ID!
    channel: string; // ID!
    permissions: NexusGenEnums['ChannelAdminPermission'][]; // [ChannelAdminPermission!]!
  }
  FollowData: { // input type
    following: string; // ID!
  }
  ForgotPasswordData: { // input type
    authKey: NexusGenScalars['AuthKey']; // AuthKey!
  }
  RejectAdminData: { // input type
    channel: string; // ID!
  }
  RemoveAdminData: { // input type
    admin: string; // ID!
    channel: string; // ID!
  }
  RequestChannelData: { // input type
    cover?: NexusGenScalars['Upload'] | null; // Upload
    handle: NexusGenScalars['Username']; // Username!
    name: string; // String!
  }
  ResetEmailData: { // input type
    email: NexusGenScalars['Email']; // Email!
    resetToken: string; // String!
  }
  ResetEmailRequestData: { // input type
    email: NexusGenScalars['Email']; // Email!
  }
  ResetPasswordData: { // input type
    password: NexusGenScalars['Password']; // Password!
    resetToken: string; // String!
  }
  ResetPasswordRequestData: { // input type
    authKey: NexusGenScalars['AuthKey']; // AuthKey!
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
  UpdatePostData: { // input type
    body?: NexusGenScalars['JSON'] | null; // JSON
    cover?: string | null; // ID
    description?: string | null; // String
    publishAt?: NexusGenScalars['Date'] | null; // Date
    published?: boolean | null; // Boolean
    subtitle?: string | null; // String
    tags?: string[] | null; // [String!]
    title?: string | null; // String
  }
  UpdateSelfData: { // input type
    avatar?: NexusGenScalars['Upload'] | null; // Upload
    bio?: string | null; // String
    birthday?: NexusGenScalars['Date'] | null; // Date
    displayName?: string | null; // String
    firstname?: NexusGenScalars['Name'] | null; // Name
    gender?: NexusGenEnums['Gender'] | null; // Gender
    lastname?: NexusGenScalars['Name'] | null; // Name
    username?: NexusGenScalars['Username'] | null; // Username
  }
  UploadImageData: { // input type
    alt?: string | null; // String
    image: NexusGenScalars['Upload']; // Upload!
  }
  ValidateResetEmailTokenData: { // input type
    resetToken: string; // String!
  }
  ValidateResetPasswordTokenData: { // input type
    resetToken: string; // String!
  }
  VoteData: { // input type
    option: number; // Int!
    poll: string; // ID!
  }
}

export interface NexusGenEnums {
  ChannelAdminPermission: "CREATE_NEW_ADMIN" | "DELETE_POST" | "EDIT_ADMINS_PERMISSIONS" | "EDIT_OTHERS_POST" | "POST" | "REMOVE_ADMIN"
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
  Announcement: { // root type
    comment?: string | null; // ID
    gif?: string | null; // ID
    id: string; // ID!
    images: Array<string | null>; // [ID]!
    poll?: string | null; // ID
    publishAt?: NexusGenScalars['Date'] | null; // Date
    published: boolean; // Boolean!
    publishedAt: NexusGenScalars['Date']; // Date!
    reAnnouncement?: string | null; // ID
    text?: string | null; // String
    user: string; // ID!
  }
  AnnouncementDislike: { // root type
    announcement: string; // ID!
    id: string; // ID!
    user: string; // ID!
  }
  AnnouncementLike: { // root type
    announcement: string; // ID!
    id: string; // ID!
    user: string; // ID!
  }
  AnnouncementPoll: { // root type
    id: string; // ID!
    options: Array<string | null>; // [String]!
    question: string; // String!
  }
  AnnouncementPollOption: { // root type
    index: number; // Int!
    option: string; // String!
    poll: string; // ID!
  }
  AnnouncementPollResult: { // root type
    id: string; // ID!
    option: number; // Int!
    poll: string; // ID!
    user: string; // ID!
  }
  AnnouncementsResponse: { // root type
    docs: NexusGenRootTypes['Announcement'][]; // [Announcement!]!
    limit: number; // Int!
    page: number; // Int!
    results: number; // Int!
  }
  AuthResponse: { // root type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Channel: { // root type
    cover: string; // String!
    handle: NexusGenScalars['Username']; // Username!
    id: string; // ID!
    name: string; // String!
    owner: string; // ID!
    verified: boolean; // Boolean!
  }
  ChannelAdmin: { // root type
    accepted: boolean; // Boolean!
    channel: string; // ID!
    id: string; // ID!
    permissions: NexusGenEnums['ChannelAdminPermission'][]; // [ChannelAdminPermission!]!
    user: string; // ID!
  }
  ChannelAdminsResponse: { // root type
    docs: NexusGenRootTypes['ChannelAdmin'][]; // [ChannelAdmin!]!
    limit: number; // Int!
    page: number; // Int!
    results: number; // Int!
  }
  ChannelsResponse: { // root type
    docs: NexusGenRootTypes['Channel'][]; // [Channel!]!
    limit: number; // Int!
    page: number; // Int!
    results: number; // Int!
  }
  Gif: { // root type
    giphyId: string; // ID!
    height: number; // Int!
    id: string; // ID!
    title: string; // String!
    url: string; // String!
    width: number; // Int!
  }
  Image: { // root type
    alt?: string | null; // String
    directory: string; // String!
    height: number; // Float!
    id: string; // ID!
    image: string; // String!
    width: number; // Float!
  }
  Mutation: {};
  Post: { // root type
    admin?: string | null; // ID
    body: string; // String!
    channel: string; // ID!
    cover?: string | null; // ID
    description?: string | null; // String
    id: string; // ID!
    publishAt?: NexusGenScalars['Date'] | null; // Date
    published: boolean; // Boolean!
    subtitle?: string | null; // String
    tags: string[]; // [String!]!
    title: string; // String!
  }
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
  Announcement: { // field return type
    comment: string | null; // ID
    commentData: NexusGenRootTypes['Announcement'] | null; // Announcement
    comments: number; // Int!
    commentsData: NexusGenRootTypes['Announcement'][]; // [Announcement!]!
    dislike: number; // Int!
    dislikeData: NexusGenRootTypes['AnnouncementDislike'][]; // [AnnouncementDislike!]!
    gif: string | null; // ID
    gifData: NexusGenRootTypes['Gif'] | null; // Gif
    id: string; // ID!
    images: Array<string | null>; // [ID]!
    imagesData: NexusGenRootTypes['Image'][]; // [Image!]!
    isDisliked: boolean; // Boolean!
    isLiked: boolean; // Boolean!
    like: number; // Int!
    likeData: NexusGenRootTypes['AnnouncementLike'][]; // [AnnouncementLike!]!
    poll: string | null; // ID
    pollData: NexusGenRootTypes['AnnouncementPoll'] | null; // AnnouncementPoll
    publishAt: NexusGenScalars['Date'] | null; // Date
    published: boolean; // Boolean!
    publishedAt: NexusGenScalars['Date']; // Date!
    reAnnouncement: string | null; // ID
    reAnnouncementData: NexusGenRootTypes['Announcement'] | null; // Announcement
    reAnnouncements: number; // Int!
    reAnnouncementsData: NexusGenRootTypes['Announcement'][]; // [Announcement!]!
    text: string | null; // String
    user: string; // ID!
    userData: NexusGenRootTypes['User']; // User!
  }
  AnnouncementDislike: { // field return type
    announcement: string; // ID!
    announcementData: NexusGenRootTypes['Announcement']; // Announcement!
    id: string; // ID!
    user: string; // ID!
    userData: NexusGenRootTypes['User']; // User!
  }
  AnnouncementLike: { // field return type
    announcement: string; // ID!
    announcementData: NexusGenRootTypes['Announcement']; // Announcement!
    id: string; // ID!
    user: string; // ID!
    userData: NexusGenRootTypes['User']; // User!
  }
  AnnouncementPoll: { // field return type
    id: string; // ID!
    myVote: NexusGenRootTypes['AnnouncementPollResult'] | null; // AnnouncementPollResult
    options: Array<string | null>; // [String]!
    optionsData: NexusGenRootTypes['AnnouncementPollOption'][]; // [AnnouncementPollOption!]!
    question: string; // String!
    votes: number; // Int!
    votesData: NexusGenRootTypes['AnnouncementPollResult'][]; // [AnnouncementPollResult!]!
  }
  AnnouncementPollOption: { // field return type
    index: number; // Int!
    option: string; // String!
    poll: string; // ID!
    votes: number; // Int!
    votesData: NexusGenRootTypes['AnnouncementPollResult'][]; // [AnnouncementPollResult!]!
  }
  AnnouncementPollResult: { // field return type
    id: string; // ID!
    option: number; // Int!
    poll: string; // ID!
    pollData: NexusGenRootTypes['AnnouncementPoll']; // AnnouncementPoll!
    user: string; // ID!
    userData: NexusGenRootTypes['User']; // User!
  }
  AnnouncementsResponse: { // field return type
    docs: NexusGenRootTypes['Announcement'][]; // [Announcement!]!
    limit: number; // Int!
    page: number; // Int!
    results: number; // Int!
  }
  AuthResponse: { // field return type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Channel: { // field return type
    admins: NexusGenRootTypes['ChannelAdmin'][]; // [ChannelAdmin!]!
    cover: string; // String!
    handle: NexusGenScalars['Username']; // Username!
    id: string; // ID!
    myAdmin: NexusGenRootTypes['ChannelAdmin'] | null; // ChannelAdmin
    name: string; // String!
    owner: string; // ID!
    ownerData: NexusGenRootTypes['User']; // User!
    verified: boolean; // Boolean!
  }
  ChannelAdmin: { // field return type
    accepted: boolean; // Boolean!
    channel: string; // ID!
    channelData: NexusGenRootTypes['Channel']; // Channel!
    id: string; // ID!
    permissions: NexusGenEnums['ChannelAdminPermission'][]; // [ChannelAdminPermission!]!
    user: string; // ID!
    userData: NexusGenRootTypes['User']; // User!
  }
  ChannelAdminsResponse: { // field return type
    docs: NexusGenRootTypes['ChannelAdmin'][]; // [ChannelAdmin!]!
    limit: number; // Int!
    page: number; // Int!
    results: number; // Int!
  }
  ChannelsResponse: { // field return type
    docs: NexusGenRootTypes['Channel'][]; // [Channel!]!
    limit: number; // Int!
    page: number; // Int!
    results: number; // Int!
  }
  Gif: { // field return type
    giphyId: string; // ID!
    height: number; // Int!
    id: string; // ID!
    title: string; // String!
    url: string; // String!
    width: number; // Int!
  }
  Image: { // field return type
    alt: string | null; // String
    directory: string; // String!
    height: number; // Float!
    id: string; // ID!
    image: string; // String!
    width: number; // Float!
  }
  Mutation: { // field return type
    acceptAdmin: NexusGenRootTypes['ChannelAdmin'] | null; // ChannelAdmin
    addAdmin: NexusGenRootTypes['ChannelAdmin']; // ChannelAdmin!
    announce: NexusGenRootTypes['Announcement'] | null; // Announcement
    checkAuthKey: boolean; // Boolean!
    checkEmail: boolean; // Boolean!
    checkHandle: boolean | null; // Boolean
    checkUsername: boolean; // Boolean!
    createPost: NexusGenRootTypes['Post'] | null; // Post
    deleteAnnouncement: NexusGenRootTypes['Announcement'] | null; // Announcement
    deletePost: NexusGenRootTypes['Post'] | null; // Post
    dislike: NexusGenRootTypes['AnnouncementDislike']; // AnnouncementDislike!
    editAdminPermissions: NexusGenRootTypes['ChannelAdmin'] | null; // ChannelAdmin
    follow: NexusGenRootTypes['UserFollow']; // UserFollow!
    forgotPassword: NexusGenRootTypes['User'] | null; // User
    like: NexusGenRootTypes['AnnouncementLike']; // AnnouncementLike!
    rejectAdmin: NexusGenRootTypes['ChannelAdmin'] | null; // ChannelAdmin
    removeAdmin: NexusGenRootTypes['ChannelAdmin'] | null; // ChannelAdmin
    requestChannel: NexusGenRootTypes['Channel']; // Channel!
    resetEmail: NexusGenRootTypes['AuthResponse'] | null; // AuthResponse
    resetEmailRequest: NexusGenRootTypes['User'] | null; // User
    resetPassword: NexusGenRootTypes['AuthResponse'] | null; // AuthResponse
    resetPasswordRequest: NexusGenRootTypes['User'] | null; // User
    signIn: NexusGenRootTypes['AuthResponse']; // AuthResponse!
    signUp: NexusGenRootTypes['AuthResponse']; // AuthResponse!
    unfollow: NexusGenRootTypes['UserFollow'] | null; // UserFollow
    updatePost: NexusGenRootTypes['Post'] | null; // Post
    updateSelf: NexusGenRootTypes['User'] | null; // User
    uploadImage: NexusGenRootTypes['Image'] | null; // Image
    validateResetEmailToken: NexusGenRootTypes['User'] | null; // User
    validateResetPasswordToken: NexusGenRootTypes['User'] | null; // User
    vote: NexusGenRootTypes['AnnouncementPollResult'] | null; // AnnouncementPollResult
  }
  Post: { // field return type
    admin: string | null; // ID
    adminData: NexusGenRootTypes['ChannelAdmin'] | null; // ChannelAdmin
    body: string; // String!
    bodyData: NexusGenScalars['JSON']; // JSON!
    channel: string; // ID!
    channelData: NexusGenRootTypes['Channel']; // Channel!
    cover: string | null; // ID
    coverData: NexusGenRootTypes['Image'] | null; // Image
    description: string | null; // String
    id: string; // ID!
    publishAt: NexusGenScalars['Date'] | null; // Date
    published: boolean; // Boolean!
    subtitle: string | null; // String
    tags: string[]; // [String!]!
    title: string; // String!
  }
  Query: { // field return type
    admins: NexusGenRootTypes['ChannelAdminsResponse']; // ChannelAdminsResponse!
    announcement: NexusGenRootTypes['Announcement'] | null; // Announcement
    announcements: NexusGenRootTypes['AnnouncementsResponse'] | null; // AnnouncementsResponse
    findChannel: NexusGenRootTypes['Channel'] | null; // Channel
    findGifs: NexusGenRootTypes['Gif'][]; // [Gif!]!
    findUser: NexusGenRootTypes['User'] | null; // User
    myAnnouncements: NexusGenRootTypes['AnnouncementsResponse'] | null; // AnnouncementsResponse
    ownedChannels: NexusGenRootTypes['ChannelsResponse'] | null; // ChannelsResponse
    self: NexusGenRootTypes['User']; // User!
    trendingGifs: NexusGenRootTypes['Gif'][]; // [Gif!]!
    userById: NexusGenRootTypes['User'] | null; // User
    users: NexusGenRootTypes['UsersResponse'] | null; // UsersResponse
  }
  User: { // field return type
    announcements: number; // Int!
    announcementsData: NexusGenRootTypes['Announcement'][]; // [Announcement!]!
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
  Announcement: { // field return type name
    comment: 'ID'
    commentData: 'Announcement'
    comments: 'Int'
    commentsData: 'Announcement'
    dislike: 'Int'
    dislikeData: 'AnnouncementDislike'
    gif: 'ID'
    gifData: 'Gif'
    id: 'ID'
    images: 'ID'
    imagesData: 'Image'
    isDisliked: 'Boolean'
    isLiked: 'Boolean'
    like: 'Int'
    likeData: 'AnnouncementLike'
    poll: 'ID'
    pollData: 'AnnouncementPoll'
    publishAt: 'Date'
    published: 'Boolean'
    publishedAt: 'Date'
    reAnnouncement: 'ID'
    reAnnouncementData: 'Announcement'
    reAnnouncements: 'Int'
    reAnnouncementsData: 'Announcement'
    text: 'String'
    user: 'ID'
    userData: 'User'
  }
  AnnouncementDislike: { // field return type name
    announcement: 'ID'
    announcementData: 'Announcement'
    id: 'ID'
    user: 'ID'
    userData: 'User'
  }
  AnnouncementLike: { // field return type name
    announcement: 'ID'
    announcementData: 'Announcement'
    id: 'ID'
    user: 'ID'
    userData: 'User'
  }
  AnnouncementPoll: { // field return type name
    id: 'ID'
    myVote: 'AnnouncementPollResult'
    options: 'String'
    optionsData: 'AnnouncementPollOption'
    question: 'String'
    votes: 'Int'
    votesData: 'AnnouncementPollResult'
  }
  AnnouncementPollOption: { // field return type name
    index: 'Int'
    option: 'String'
    poll: 'ID'
    votes: 'Int'
    votesData: 'AnnouncementPollResult'
  }
  AnnouncementPollResult: { // field return type name
    id: 'ID'
    option: 'Int'
    poll: 'ID'
    pollData: 'AnnouncementPoll'
    user: 'ID'
    userData: 'User'
  }
  AnnouncementsResponse: { // field return type name
    docs: 'Announcement'
    limit: 'Int'
    page: 'Int'
    results: 'Int'
  }
  AuthResponse: { // field return type name
    token: 'String'
    user: 'User'
  }
  Channel: { // field return type name
    admins: 'ChannelAdmin'
    cover: 'String'
    handle: 'Username'
    id: 'ID'
    myAdmin: 'ChannelAdmin'
    name: 'String'
    owner: 'ID'
    ownerData: 'User'
    verified: 'Boolean'
  }
  ChannelAdmin: { // field return type name
    accepted: 'Boolean'
    channel: 'ID'
    channelData: 'Channel'
    id: 'ID'
    permissions: 'ChannelAdminPermission'
    user: 'ID'
    userData: 'User'
  }
  ChannelAdminsResponse: { // field return type name
    docs: 'ChannelAdmin'
    limit: 'Int'
    page: 'Int'
    results: 'Int'
  }
  ChannelsResponse: { // field return type name
    docs: 'Channel'
    limit: 'Int'
    page: 'Int'
    results: 'Int'
  }
  Gif: { // field return type name
    giphyId: 'ID'
    height: 'Int'
    id: 'ID'
    title: 'String'
    url: 'String'
    width: 'Int'
  }
  Image: { // field return type name
    alt: 'String'
    directory: 'String'
    height: 'Float'
    id: 'ID'
    image: 'String'
    width: 'Float'
  }
  Mutation: { // field return type name
    acceptAdmin: 'ChannelAdmin'
    addAdmin: 'ChannelAdmin'
    announce: 'Announcement'
    checkAuthKey: 'Boolean'
    checkEmail: 'Boolean'
    checkHandle: 'Boolean'
    checkUsername: 'Boolean'
    createPost: 'Post'
    deleteAnnouncement: 'Announcement'
    deletePost: 'Post'
    dislike: 'AnnouncementDislike'
    editAdminPermissions: 'ChannelAdmin'
    follow: 'UserFollow'
    forgotPassword: 'User'
    like: 'AnnouncementLike'
    rejectAdmin: 'ChannelAdmin'
    removeAdmin: 'ChannelAdmin'
    requestChannel: 'Channel'
    resetEmail: 'AuthResponse'
    resetEmailRequest: 'User'
    resetPassword: 'AuthResponse'
    resetPasswordRequest: 'User'
    signIn: 'AuthResponse'
    signUp: 'AuthResponse'
    unfollow: 'UserFollow'
    updatePost: 'Post'
    updateSelf: 'User'
    uploadImage: 'Image'
    validateResetEmailToken: 'User'
    validateResetPasswordToken: 'User'
    vote: 'AnnouncementPollResult'
  }
  Post: { // field return type name
    admin: 'ID'
    adminData: 'ChannelAdmin'
    body: 'String'
    bodyData: 'JSON'
    channel: 'ID'
    channelData: 'Channel'
    cover: 'ID'
    coverData: 'Image'
    description: 'String'
    id: 'ID'
    publishAt: 'Date'
    published: 'Boolean'
    subtitle: 'String'
    tags: 'String'
    title: 'String'
  }
  Query: { // field return type name
    admins: 'ChannelAdminsResponse'
    announcement: 'Announcement'
    announcements: 'AnnouncementsResponse'
    findChannel: 'Channel'
    findGifs: 'Gif'
    findUser: 'User'
    myAnnouncements: 'AnnouncementsResponse'
    ownedChannels: 'ChannelsResponse'
    self: 'User'
    trendingGifs: 'Gif'
    userById: 'User'
    users: 'UsersResponse'
  }
  User: { // field return type name
    announcements: 'Int'
    announcementsData: 'Announcement'
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
    acceptAdmin: { // args
      data: NexusGenInputs['AcceptAdminData']; // AcceptAdminData!
    }
    addAdmin: { // args
      data: NexusGenInputs['AddAdminData']; // AddAdminData!
    }
    announce: { // args
      data: NexusGenInputs['AnnounceData']; // AnnounceData!
    }
    checkAuthKey: { // args
      data: NexusGenInputs['CheckAuthKeyData']; // CheckAuthKeyData!
    }
    checkEmail: { // args
      data: NexusGenInputs['CheckEmailData']; // CheckEmailData!
    }
    checkHandle: { // args
      data: NexusGenInputs['CheckHandleData']; // CheckHandleData!
    }
    checkUsername: { // args
      data: NexusGenInputs['CheckUsernameData']; // CheckUsernameData!
    }
    createPost: { // args
      data: NexusGenInputs['CreatePostData']; // CreatePostData!
    }
    deleteAnnouncement: { // args
      id: string; // ID!
    }
    deletePost: { // args
      id: string; // ID!
    }
    dislike: { // args
      announcement: string; // ID!
    }
    editAdminPermissions: { // args
      data: NexusGenInputs['EditAdminPermissionsData']; // EditAdminPermissionsData!
    }
    follow: { // args
      data: NexusGenInputs['FollowData']; // FollowData!
    }
    forgotPassword: { // args
      data: NexusGenInputs['ForgotPasswordData']; // ForgotPasswordData!
    }
    like: { // args
      announcement: string; // ID!
    }
    rejectAdmin: { // args
      data: NexusGenInputs['RejectAdminData']; // RejectAdminData!
    }
    removeAdmin: { // args
      data: NexusGenInputs['RemoveAdminData']; // RemoveAdminData!
    }
    requestChannel: { // args
      data: NexusGenInputs['RequestChannelData']; // RequestChannelData!
    }
    resetEmail: { // args
      data: NexusGenInputs['ResetEmailData']; // ResetEmailData!
    }
    resetEmailRequest: { // args
      data: NexusGenInputs['ResetEmailRequestData']; // ResetEmailRequestData!
    }
    resetPassword: { // args
      data: NexusGenInputs['ResetPasswordData']; // ResetPasswordData!
    }
    resetPasswordRequest: { // args
      data: NexusGenInputs['ResetPasswordRequestData']; // ResetPasswordRequestData!
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
    updatePost: { // args
      data: NexusGenInputs['UpdatePostData']; // UpdatePostData!
      id: string; // ID!
    }
    updateSelf: { // args
      data: NexusGenInputs['UpdateSelfData']; // UpdateSelfData!
    }
    uploadImage: { // args
      data: NexusGenInputs['UploadImageData']; // UploadImageData!
    }
    validateResetEmailToken: { // args
      data: NexusGenInputs['ValidateResetEmailTokenData']; // ValidateResetEmailTokenData!
    }
    validateResetPasswordToken: { // args
      data: NexusGenInputs['ValidateResetPasswordTokenData']; // ValidateResetPasswordTokenData!
    }
    vote: { // args
      data: NexusGenInputs['VoteData']; // VoteData!
    }
  }
  Query: {
    admins: { // args
      filter?: NexusGenScalars['JSON'] | null; // JSON
      limit?: number | null; // Int
      page?: number | null; // Int
      sort?: NexusGenScalars['JSON'] | null; // JSON
    }
    announcement: { // args
      id: string; // ID!
    }
    announcements: { // args
      filter?: NexusGenScalars['JSON'] | null; // JSON
      limit?: number | null; // Int
      page?: number | null; // Int
      sort?: NexusGenScalars['JSON'] | null; // JSON
    }
    findChannel: { // args
      filter: NexusGenScalars['JSON']; // JSON!
    }
    findGifs: { // args
      limit?: number | null; // Int
      page?: number | null; // Int
      query: string; // String!
    }
    findUser: { // args
      filter: NexusGenScalars['JSON']; // JSON!
    }
    myAnnouncements: { // args
      filter?: NexusGenScalars['JSON'] | null; // JSON
      limit?: number | null; // Int
      page?: number | null; // Int
      sort?: NexusGenScalars['JSON'] | null; // JSON
    }
    ownedChannels: { // args
      filter?: NexusGenScalars['JSON'] | null; // JSON
      limit?: number | null; // Int
      page?: number | null; // Int
      sort?: NexusGenScalars['JSON'] | null; // JSON
    }
    trendingGifs: { // args
      limit?: number | null; // Int
      page?: number | null; // Int
    }
    userById: { // args
      id: string; // ID!
    }
    users: { // args
      filter?: NexusGenScalars['JSON'] | null; // JSON
      limit?: number | null; // Int
      page?: number | null; // Int
      sort?: NexusGenScalars['JSON'] | null; // JSON
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