namespace ProjectC.Helper
{
    public class Statistics
    {
        public Statistics(string name, int uv, int pv = 0, int amt = 0)
        {
            this.name = name;
            this.uv = uv;
            this.pv = pv;
            this.amt = amt;
        }

        public string name;
        public int uv;
        public int pv;
        public int amt;
    }
}
