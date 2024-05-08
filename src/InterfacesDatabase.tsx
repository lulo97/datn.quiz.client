//29 Table

export interface User {
    UserId: string;
    Fullname: string;
    Username: string;
    Email: string;
    Biography: string;
    AvatarUrl: string;
}

export interface Achievement {
    AchievementId: string;
    Name: string;
    Description: string;
    CreateAt: Date;
}

export interface UserAchievement {
    UserAchievementId: string;
    UserId: string;
    AchievementId: string;
    CreateAt: string;
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
}

export interface QuestionInformation {
    QuestionInformationId: string;
    Content: string;
    ImageUrl: string;
    AudioUrl: string;
    Explaination: string;
    Time: number;
    Point: number;
    PenaltyPoint: number;
    CorrectUserCount: number;
    IncorrectUserCount: number;
    IsDeleted: boolean;
    IsAllowPenalty: boolean;
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
    AvatarUrl: string;
    Attempts: number;
    IsPublic: boolean;
    IsDeleted: boolean;
    IsVerified: boolean;
    UserVertify: string;
    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface Quiz {
    QuizId: string;
    UserId: string;
    QuizInformationId: string;
    EducationLevelId: string;
    SubjectId: string;
}

export interface SubSubject {
    SubSubjectId: string;
    SubjectId: string;
    Name: string;
    Description: string;
    CreateAt: Date;
}

export interface EducationLevel {
    EducationLevelId: string;
    Name: string;
    Description: string;
    CreateAt: Date;
}

export interface Language {
    LanguageId: string;
    Name: string;
    Description: string;
    CreateAt: Date;
}

export interface Type {
    TypeId: string;
    Name: string;
    Description: string;
    CreateAt: Date;
}

export interface DifficultLevel {
    DifficultLevelId: string;
    Name: string;
    Description: string;
    CreateAt: Date;
}
export interface Play {
    PlayId: string;
    UserId: string;
    QuizId: string;
    RoomId: string | null;
    StartTime: Date;
    EndTime: Date;
    Score: number;
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
    CreateAt: Date;
}

export interface Comment {
    CommentId: string;
    ParentId: string;
    CreateUserId: string;
    CreatedAt: Date;
    UpdatedAt: Date;
    Content: string;
    UpvoteCount: number;
    DownvoteCount: number;
}

export interface Follow {
    FollowId: string;
    FollowerId: string;
    FolloweeId: string;
    FollowDate: Date;
}

export interface Notification {
    NotificationId: string;
    DestinationId: string;
    SourceId: string;
    Name: string;
    Content: string;
    Date: Date;
    IsRead: boolean;
    IsVisible: boolean;
}

export interface Room {
    RoomId: string;
    StartTime: Date;
    EndTime: Date;
    Capacity: number;
}

export interface UserInRoom {
    UserInRoom: string;
    UserId: string;
    RoomId: string;
    StartTime: Date;
    EndTime: Date;
    TotalQuestionViewed: number;
    CurrentQuestionIndex: number;
    CurrentScore: number;
}

export interface Role {
    RoleId: string;
    Name: string;
    Description: string;
    CreateAt: Date;
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
    CreateAt: Date;
}

export interface RolePermission {
    RolePermission: string;
    RoleId: string;
    PermissionId: string;
}

export interface Rating {
    RatingId: string;
    UserId: string;
    QuizId: string;
    Score: number;
}

export interface Report {
    ReportId: string;
    ReportReasonId: string;
    UserId: string;
    ParentId: string;
    Content: string;
    CreateAt: Date;
    IsResolved: boolean;
    UserResolve: string;
}

export interface ReportTarget {
    ReportTargetId: string;
    Title: string;
    Description: string;
    CreateAt: Date;
}

export interface ReportReason {
    ReportReasonId: string;
    ReportTargetId: string;
    ParentId: string;
    Title: string;
    Description: string;
    CreateAt: Date;
}
