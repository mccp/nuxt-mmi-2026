// Add generic in type to make it more flexible
type ApiResponse<T> = {
  success: boolean
  data: T
}