using System.Collections.Generic;

namespace ProjectC.Database.Core
{
    public class FieldType
    {
        public const string Boolean = "Boolean";
        public const string Date = "Date";
        public const string DateTime = "DateTime";
        public const string Time = "Time";
        public const string Char = "Char";
        public const string Varchar = "Varchar";
        public const string Text = "Text";
        public const string SmallInt = "SmallInt";
        public const string Integer = "Integer";
        public const string BigInt = "BigInt";
        public const string Decimal = "Decimal";

        public static readonly FieldType _BOOLEAN = new FieldType(1);
        public static readonly FieldType _DATE = new FieldType();
        public static readonly FieldType _DATETIME = new FieldType();
        public static readonly FieldType _TIME = new FieldType();
        public static readonly FieldType _CHAR = new FieldType(255);
        public static readonly FieldType _VARCHAR = new FieldType(255);
        public static readonly FieldType _TEXT = new FieldType();
        public static readonly FieldType _SMALLINT = new FieldType(5);
        public static readonly FieldType _INTEGER = new FieldType(10);
        public static readonly FieldType _BIGINT = new FieldType(19);
        public static readonly FieldType _DECIMAL = new FieldType(38, 5);

        public static IEnumerable<FieldType> Values
        {
            get
            {
                yield return _BOOLEAN;
                yield return _DATE;
                yield return _DATETIME;
                yield return _TIME;
                yield return _CHAR;
                yield return _VARCHAR;
                yield return _TEXT;
                yield return _SMALLINT;
                yield return _INTEGER;
                yield return _BIGINT;
                yield return _DECIMAL;
            }
        }

        private FieldType()
        {

        }

        private FieldType(int size)
        {
            Size = size;
            NeedSize = true;
        }

        private FieldType(int size, int digitSize)
        {
            Size = size;
            DigitSize = digitSize;
            NeedSize = true;
            NeedDigitSize = true;
        }

        public int Size { get; private set; }

        public void SetSize(int n)
        {
            Size = n;
            NeedSize = true;
        }

        public int DigitSize { get; private set; }

        public void SetDigitSize(int n)
        {
            DigitSize = n;
            NeedDigitSize = true;
        }

        public bool NeedSize { get; private set; }

        public bool NeedDigitSize { get; private set; }

        public static FieldType GetByName(string Name)
        {
            switch (Name)
            {
                case Boolean:
                    return _BOOLEAN;
                case Date:
                    return _DATE;
                case DateTime:
                    return _DATETIME;
                case Time:
                    return _TIME;
                case Char:
                    return _CHAR;
                case Varchar:
                    return _VARCHAR;
                case Text:
                    return _TEXT;
                case SmallInt:
                    return _SMALLINT;
                case Integer:
                    return _INTEGER;
                case BigInt:
                    return _BIGINT;
                case Decimal:
                    return _DECIMAL;
            }

            return null;
        }
    }
}