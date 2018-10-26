namespace ProjectC.Database.SQL
{
    public enum QueryPartType
    {
        Equal,
        NotEqual,
        Like,
        In,
        Between
    }

    internal static class QueryPartTypeMethods
    {
        public static string GetString(this QueryPartType s1)
        {
            switch (s1)
            {
                case QueryPartType.Equal:
                    return "=";
                case QueryPartType.NotEqual:
                    return "!=";
                case QueryPartType.Like:
                    return "LIKE";
                case QueryPartType.In:
                    return "IN";
                case QueryPartType.Between:
                    return "Between";
                default:
                    return "=";
            }
        }
    }
}
