namespace ProjectC.Database.SQL
{
    public class QueryPart
    {
        public string Key;
        public string Value;
        public QueryPartType Type;

        public QueryPart(string key, string value, QueryPartType type = QueryPartType.Equal)
        {
            Key = key;
            Value = value;
            Type = type;
        }
    }
}
