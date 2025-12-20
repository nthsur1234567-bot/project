export type CourseFile = { // comment: course file entity
  id: string; // comment: unique id
  courseId: string; // comment: related course id
  displayName: string; // comment: display name set by user
  originalName: string; // comment: original file name
  mimeType: string; // comment: file mime type
  sizeBytes: number; // comment: file size
  dataUrl: string; // comment: base64 data url for download
  createdAt: number; // comment: upload timestamp
}; // comment: end type
