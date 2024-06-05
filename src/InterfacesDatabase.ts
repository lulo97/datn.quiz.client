export interface User {
    UserId: string;
    ClerkId: string;
    Fullname: string;
    Username: string;
    Email: string;
    Biography: string;
    ImageUrl: string;
    CreatedAt: string;
}

export interface Achievement {
    AchievementId: string;
    ImageUrl: string;
    Name: string;
    Description: string;
    CreatedAt: string;
}

export interface UserAchievement {
    UserAchievementId: string;
    UserId: string;
    AchievementId: string;
    CreatedAt: string;
}

export interface Question {
    QuestionId: string;
    QuestionInformationId: string;
    UserId: string;
    TypeId: string;
    SubSubjectId: string;
    EducationLevelId: string;
    DifficultLevelId: string;
    LanguageId: string;
    PointId: string;
    PenaltyPointId: string;
}

export interface QuestionInformation {
    QuestionInformationId: string;
    Content: string;
    ImageUrl: string;
    AudioUrl: string;
    Explanation: string;
    CorrectUserCount: number;
    IncorrectUserCount: number;
    IsDeleted: boolean;
    IsAllowPenalty: boolean;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface Answer {
    AnswerId: string;
    QuestionId: string;
    Content: string;
    IsCorrect: boolean;
}

export interface QuizInformation {
    QuizInformationId: string;
    Name: string;
    Description: string;
    ImageUrl: string;
    Attempts: number;
    IsPublic: boolean;
    IsDeleted: boolean;
    IsVerified: boolean;
    UserVerify: string;
    VerifiedAt: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface Quiz {
    QuizId: string;
    UserId: string;
    QuizInformationId: string;
    EducationLevelId: string;
    SubjectId: string;
    QuizTimeId: string;
    QuestionTimeId: string;
}

export interface SubSubject {
    SubSubjectId: string;
    SubjectId: string;
    Name: string;
    Description: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface QuizQuestion {
    QuizQuestionId: string;
    QuizId: string;
    QuestionId: string;
}

export interface Subject {
    SubjectId: string;
    Name: string;
    Description: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface EducationLevel {
    EducationLevelId: string;
    Name: string;
    Description: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface Language {
    LanguageId: string;
    Name: string;
    Description: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface Type {
    TypeId: string;
    Name: string;
    Description: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface DifficultLevel {
    DifficultLevelId: string;
    Name: string;
    Description: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface Play {
    PlayId: string;
    UserId: string;
    QuizId: string;
    RoomId: string;
    StartTime: string;
    EndTime: string;
    Score: number;
    CreateAt: string;
}

export interface SelectedAnswer {
    SelectedAnswersId: string;
    PlayId: string;
    AnswerId: string;
}

export interface Like {
    LikeId: string;
    QuizId: string;
    UserId: string;
    CreatedAt: string;
}

export interface Comment {
    CommentId: string;
    ParentId: string;
    CreateUserId: string;
    CreatedAt: string;
    UpdatedAt: string;
    Content: string;
    UpvoteCount: number;
    DownvoteCount: number;
}

export interface UpvoteComment {
    UpvoteCommentId: string;
    CommentId: string;
    UserId: string;
    CreatedAt: string;
}

export interface DownvoteComment {
    DownvoteCommentId: string;
    CommentId: string;
    UserId: string;
    CreatedAt: string;
}

export interface Follow {
    FollowId: string;
    FollowerId: string;
    FolloweeId: string;
    CreatedAt: string;
}

export interface Notification {
    NotificationId: string;
    UserReceived: string;
    UserSent: string;
    Name: string;
    Content: string;
    CreatedAt: string;
    IsRead: boolean;
    IsVisible: boolean;
}

export interface Room {
    RoomId: string;
    QuizId: string;
    UserId: string;
    Name: string;
    StartTime: string;
    EndTime: string;
    Capacity: number;
    CreateAt: string;
}

export interface UserInRoom {
    UserInRoom: string;
    UserId: string;
    RoomId: string;
    StartTime: string;
    EndTime: string;
    TotalQuestionViewed: number;
    CurrentQuestionIndex: number;
    CurrentScore: number;
}

export interface Role {
    RoleId: string;
    Name: string;
    Description: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface UserRole {
    UserRoleId: string;
    UserId: string;
    RoleId: string;
}

export interface Permission {
    PermissionId: string;
    Name: string;
    Description: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface RolePermission {
    RolePermissionId: string;
    RoleId: string;
    PermissionId: string;
}

export interface Rating {
    RatingId: string;
    UserId: string;
    QuizId: string;
    Score: number;
    Content: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface Report {
    ReportId: string;
    ReportReasonId: string;
    ReportTargetId: string;
    UserId: string;
    ParentId: string;
    Content: string;
    CreatedAt: string;
    IsResolved: boolean;
    UserResolve: string;
}

export interface ReportTarget {
    ReportTargetId: string;
    Name: string;
    Description: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface ReportReason {
    ReportReasonId: string;
    Name: string;
    Description: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface Point {
    PointId: string;
    Value: number;
    IsPenalty: boolean;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface Time {
    TimeId: string;
    Value: number;
    CreatedAt: string;
    UpdatedAt: string;
}