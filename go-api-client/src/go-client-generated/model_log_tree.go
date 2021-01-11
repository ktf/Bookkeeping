/*
 * ALICE Bookkeeping
 *
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * API version: 0.0.0
 * Generated by: Swagger Codegen (https://github.com/swagger-api/swagger-codegen.git)
 */
package swagger

// Describes an intervention or an event that happened.
type LogTree struct {
	Attachments *[]Attachment `json:"attachments,omitempty"`
	Author *User `json:"author"`
	Children *[]LogTree `json:"children"`
	// Unix timestamp when this entity was created.
	CreatedAt int64 `json:"createdAt,omitempty"`
	Id int32 `json:"id"`
	Origin *LogOrigin `json:"origin"`
	ParentLogId int32 `json:"parentLogId"`
	Replies int64 `json:"replies,omitempty"`
	RootLogId int32 `json:"rootLogId"`
	// Array of minified Run objects.
	Runs []LogRuns `json:"runs,omitempty"`
	Subsystems *[]Subsystem `json:"subsystems,omitempty"`
	Subtype *LogSubtype `json:"subtype"`
	Tags *[]Tag `json:"tags,omitempty"`
	Text string `json:"text"`
	Title string `json:"title"`
	// Unix timestamp when this entity was last updated.
	UpdatedAt int64 `json:"updatedAt,omitempty"`
}
