using System.Collections.Generic;
using ProjectC.Database.Core.Annotations;
using ProjectC.Database.Core.Interfaces;
using ProjectC.Model;

namespace ProjectC.Database.Entities
{
    [Entity]
    public class Specification : IEntity
    {
        public static readonly string Merk = "Merk";
        public static readonly string Os = "Os";
        public static readonly string Geheugen = "Geheugen";
        public static readonly string TelefoonGrootte = "TelefoonGrootte";
        public static readonly string Camera = "Camera";
        public static readonly string Opslag = "Opslag";
        public static readonly string Kleur = "Kleur";
        public static readonly string Resolutie = "Resolutie";
        public static readonly string SchermGrootte = "SchermGrootte";
        public static readonly string Gewicht = "Gewicht";
        public static readonly string Processor = "Processor";
        public static readonly string Accu = "Accu";
        public static readonly string SimlockVrij = "SimlockVrij";
        public static readonly string RAM = "RAM";
        public static readonly string MicroSD = "MicroSD";
        public static readonly string InternetType = "InternetType";
        public static readonly string DualSim = "DualSim";

        [Field("SpecificationId", Primary = true)]
        public int Id;

        [Field] public string Name;
        [Field] public string Value;
        [Field] public int ProductId;

        public int GetId()
        {
            return Id;
        }

        public void SetId(int id)
        {
            this.Id = id;
        }
    }
}
