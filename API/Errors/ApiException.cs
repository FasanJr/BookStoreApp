namespace API.Errors
{
    public class ApiException
    {
        public ApiException(int statusCode, string messgaes = null, string details = null)
        {
            StatusCode = statusCode;
            Messgaes = messgaes;
            Details = details;
        }

        public int StatusCode { get; set; }

        public string Messgaes { get; set; }

        public string Details { get; set; }
    }
}