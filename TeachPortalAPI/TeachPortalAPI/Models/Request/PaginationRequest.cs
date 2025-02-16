namespace TeachPortalAPI.Models.Admin
{
    public class PaginationRequest
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? SortBy { get; set; } = null;
        public bool IsDecsending { get; set; } = false;
    }
}