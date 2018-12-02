using System.Collections.Generic;

namespace ProjectC.Database.SQL
{
    public class MultiQueryPart
    {
        public string Key;
        public List<QueryPart> QueryParts;

        public MultiQueryPart(string key)
        {
            Key = key;
            QueryParts = new List<QueryPart>();
        }

        public void AddValue(string value, QueryPartType type = QueryPartType.Equal)
        {
            QueryParts.Add(new QueryPart(Key, value, type));
        }
    }
}
